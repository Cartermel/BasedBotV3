FROM node:16-alpine AS BUILD_IMAGE

# install some dependencies for the build image
RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*

# grab node-prune which will save us ~20mb
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

# Create app directory
WORKDIR /usr/basedbot

COPY package*.json yarn.lock ./

# Install app dependencies - we need dev deps to compile the typescript
RUN yarn --frozen-lockfile

# Bundle app source
COPY . .

# build da mf
RUN yarn build

# Remove all node_modules folders to remove dev dependencies now that we have compiled the ts
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

# set environment to production by default
ENV NODE_ENV=production

# copy from build image to the based image
COPY .app-config.* ./
COPY --from=BUILD_IMAGE /usr/basedbot/dist ./dist
COPY --from=BUILD_IMAGE /usr/basedbot/node_modules ./node_modules

CMD [ "node", "./dist/index.js" ]