FROM node:10.15.3 as build
#Setup working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install

#Copy remaining files
COPY . .

#Start the application
CMD ["npm", "run", "start"]