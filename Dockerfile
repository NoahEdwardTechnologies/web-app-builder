FROM mhart/alpine-node:8.9.1
# RUN apk add --no-cache make gcc g++ python
WORKDIR /app
COPY package.json /app
COPY dist /app/dist
ENV NODE_ENV production
RUN npm install --production
CMD node dist/node.main.js
EXPOSE 3000
