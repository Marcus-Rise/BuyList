FROM node:14 AS base
WORKDIR /app

FROM base AS dev
WORKDIR /app
USER node

CMD npm install && npm run dev

FROM nginx AS web-dev

EXPOSE 80

FROM base AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY pages ./pages
COPY public ./public
COPY src ./src
COPY ./*.js* ./

RUN npm run test
RUN npm run build
RUN npm run export
RUN find out -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|css\)$' -exec gzip -f -k {} \;

FROM nginx AS web

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /app

EXPOSE 80

FROM scratch AS artifacts

COPY --from=build /app/out /

