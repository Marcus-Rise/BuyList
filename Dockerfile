ARG NODE_VERSION=14

FROM node:${NODE_VERSION} AS dev
WORKDIR /app
USER node

CMD npm install \
    && npx next telemetry --disable \
    && npm run dev

FROM nginx AS web-dev

EXPOSE 80

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npx next telemetry --disable

COPY pages ./pages
COPY public ./public
COPY src ./src
COPY ./*.js* ./

RUN npm run lint
RUN npm run test
RUN npm run build
RUN npm run export
RUN cp -r .next/analyze out/analyze
RUN find out -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|css\)$' -exec gzip -f -k {} \;

FROM nginx AS web

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /app

EXPOSE 80

FROM scratch AS artifacts

COPY --from=build /app/out /

