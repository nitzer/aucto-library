# aucto-library

Test for Aucto

## Description

- This project is divided in 2 parts and the noSql volume
- the backend is done in NestJS using socket for websocket connection
- the front end is in vanilla React with react-router, react-query and socketIO as the websocket client. for UI I've choose to use ANTD to check how it works and to learn about it.

## How to run it

You need docker with docker-compose already installed (latest version, may work with previous versions too.)

```
  docker-compose up -d
```

Now you can access: http://localhost:3001

## Issues

It's possible that if run this under a kubernetes cluster or other kind of infrastructure, you may need to check the urls.
