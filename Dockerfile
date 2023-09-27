FROM node:12.18.4-buster-slim as builder
LABEL maintainer="Fabian Morón Zirfas"
# LABEL version="1.0.0"
LABEL description="A frontend for a the project flusshygiene"
ENV NODE_ENV=development

# https://github.com/docker/compose/issues/1837#issuecomment-316896858
# When building a Docker image from the commandline, you can set those values using –build-arg:
# docker build --build-arg some_variable_name=a_value
ARG PORT=8080
ENV PORT $PORT

# the line below is for localtesting
# ENV REACT_APP_API_HOST $REACT_APP_API_HOST

WORKDIR /usr/app
COPY ./package*.json ./
RUN apt-get update && apt-get install -y build-essential python  && rm -rf /var/lib/apt/lists/*
RUN npm ci --quiet
COPY ./ ./
RUN npm run build
FROM node:12.18.4-buster-slim as app
WORKDIR  /usr/app
RUN apt-get update && apt-get install -y tini  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
COPY --from=builder /usr/app/build ./build
COPY ./server/package*.json ./
RUN npm ci --quiet
COPY ./server/* ./server/
# ENV TINI_VERSION v0.19.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x /tini
ENTRYPOINT ["tini", "--"]
USER node
EXPOSE ${PORT}
CMD [ "node" , "server/index.js"]

