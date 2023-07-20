# Dependencies
FROM node:16-slim as dependencies

COPY .yarn /app/.yarn
COPY packages/backend/package.json /app/packages/backend/package.json
COPY yarn.lock package.json lerna.json .yarnrc.yml /app/

WORKDIR /app/

RUN yarn install

# Builder
FROM node:16-slim as builder

COPY --from=dependencies /app/node_modules /app/node_modules
COPY packages /app/packages
COPY package.json /app

WORKDIR /app/packages/backend

RUN yarn build

# Runner
FROM gcr.io/distroless/nodejs:16 as runner

LABEL "org.opencontainers.image.source"="https://github.com/Quick-Ship/quickship"

COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=builder /app/packages/backend/dist /app/packages/backend/dist

WORKDIR /app/packages/backend

CMD ["dist/main"]
