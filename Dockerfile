FROM node:16-alpine AS BUILD_IMAGE

RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

# Create app directory
WORKDIR /usr/basedbot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json yarn.lock ./

RUN yarn --frozen-lockfile

# Bundle app source
COPY . .

RUN yarn build

COPY .env ./dist/

# Remove all node_modules folders to remove dev dependencies
RUN find . -type d -name "node_modules" -prune -exec rm -r {} +

# Download production dependencies
RUN yarn install --frozen-lockfile --production

# Reduce node_modules folder size by approximately 200 petabytes
RUN /usr/local/bin/node-prune

# Remove all source files that should not exist in production
RUN find . ! -type d \
  ! -name "tsconfig.json" \
  ! -name "package.json" \
  ! -name "yarn.lock" \
  ! -path "*dist*" \
  ! -path "*node_modules*" \
  ! -path "*schemas*" \
  ! -path "*schema*" \
  ! -path "*email-templates*" \
  ! -path "*seeds*" \
  ! -path "*migrations*" \
  -delete

FROM node:16-alpine

WORKDIR /usr/basedbot

# copy from build image
COPY --from=BUILD_IMAGE /usr/basedbot/dist ./dist
COPY --from=BUILD_IMAGE /usr/basedbot/node_modules ./node_modules

CMD [ "node", "./dist/index.js" ]