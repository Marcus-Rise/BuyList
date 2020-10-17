FROM node:14 AS base
WORKDIR /app

FROM base AS dev
WORKDIR /app

CMD npm install && npm run dev

FROM base AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY pages ./pages
COPY public ./public
COPY src ./src
COPY ./*.js* ./

RUN npm run build
RUN npm run export
RUN find out -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|css\)$' -exec gzip -f -k {} \;

FROM scratch AS artifacts

COPY --from=build /app/out /

