ARG NODE_VERSION=14

FROM node:${NODE_VERSION} AS dev
WORKDIR /app
USER node

CMD npm ci \
    && npx next telemetry --disable \
    && npm run dev

FROM node:${NODE_VERSION}-alpine AS check
WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npx next telemetry --disable

COPY pages ./pages
COPY src ./src
COPY ./*.js* ./

RUN npm run lint
RUN npm run test

