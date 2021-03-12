# Install the current alpine version
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Copy app to container
COPY . .

# Expose port of the app
EXPOSE 9090

# RUN [ "npm", "run", "seed" ]

# Start express
CMD [ "npm", "run", "start" ]