## Build tool monitor log with Elasticsearch + Kibana + Filebeat. ELK + filebeat

Sending Docker Logs to ElasticSearch and Kibana with FileBeat

- Elasticsearch:

- Kibana: Provide UI for elastic

- Filebeat: Filebeat is **a lightweight shipper for forwarding and centralizing log data**. Installed as an agent on your servers, Filebeat monitors the log files or locations that you specify, collects log events, and forwards them either to Elasticsearch or Logstash for indexing.

## Explain

- How Elasticsearch + Kibana + Filebeat communicate with each other

![](images/ELK_filebeat.png 'ELK and filebeat')

- Demo flow
  ![](images/demo-flow.png 'demo')
  Server 1: This is a main logs server. That ingests data from multiple sources simultaneously and transforms it
  Server 2: This is a app server
  We can have multiple `server app` with only one `server log`

- Architecture
  ![](images/architecture.png 'architecture')

## How to run demo

### Environment & setup

- ELK: 7.8.0
- Filebeat: 7.8.0
- Docker: Docker version 20.10.14, build a224086
- Docker-compose: version 1.29.2, build 5becea4c
- OS: Windows 10. Work fine in Linux, Mac OS...

### 1. Run a service that wants to monitor log

Workdir: `./app`

In this demo, we build EKL + filebeat to monitor logs of a docker container. Then, we will start an app service in a container firstly

Start app

```sh
docker run -p 3000:3000 -d log-demo
```

### 2. Run Elasticsearch + Kibana service

Workdir: `./elasticsearch_kibana`

Start elasticsearch and kibana service

```sh
docker-compose up -d
```

### 3. Run filebeat service to pushing log to ELK

Workdir: `./filebeat`

Change configuration depending on elasticsearch server in `./conf/filebeat.yml`

Start filebeat service

```sh
docker-compose up -d
```

### 3. Create index pattern (manual on kibana)

The first thing you have to do is to configure the ElasticSearch indices that can be displayed in Kibana.

![](images/create-index-1.png 'create index step 1')

You can use the pattern filebeat-\* to include all the logs coming from FileBeat.

You also need to define the field used as the log timestamp. You should use @timestamp as shown below:

![](images/create-index-2.png 'create index step 2')

**Note**: Run service `filebeat` and `ELK` (Elasticsearch + Kibana) in same network (2 docker-compose run on 1 network) to communicate with each other by internal host (container name). If not, expose port of ELK and config filebeat to host of local machine `host.docker.internal`.
If `filebeat` and `ELK` running on same docker network. We should config `output.elasticsearch.hosts : ['<es-container-name>:9200']` at line 18 in file `filebeat/conf/filebeat.yml`. Else, set `output.elasticsearch.hosts : ['<elasticsearch-host>:9200']`

### Ref:

- https://www.sarulabs.com/post/5/2019-08-12/sending-docker-logs-to-elasticsearch-and-kibana-with-filebeat.html
