FROM node:10-alpine

# Create working directory&nbsp;
RUN mkdir -p /usr/src/app

# Select the newly created directory as the work directory
WORKDIR /usr/src/app

# Copy package.json file
COPY package*.json ./

# Install app dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/src/app

# expose port 4000
EXPOSE 4000

# Run the app
CMD ["node", "index"]
