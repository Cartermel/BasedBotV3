FROM node:16

# Create app directory
WORKDIR /usr/basedbot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

RUN yarn build
COPY .env ./dist/
WORKDIR ./dist

CMD [ "node", "index.js" ]