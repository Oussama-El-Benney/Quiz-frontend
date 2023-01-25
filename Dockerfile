# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:17.0.1-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@13

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
