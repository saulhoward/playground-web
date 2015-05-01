# Playground Web

An experimental open-source version of [AWS Lambda](http://aws.amazon.com/lambda/).
Write code directly in the browser in multiple languages and run it in
Docker containers on Kubernetes. 

![Screenshot](https://github.com/saulhoward/playground-web/raw/master/docs/playground-screenshot.png)

Uses the [playground-server](https://github.com/asim/playground-server)
as a backend.

## Setup

```
git submodule update --init
./web-scripts/setup.sh
```

Then you can run a development server with:

```
gulp start
```

## Architecture notes

A JavaScript single page application built in ReactJS with a Flux
architecture.

Uses:

- React
- Flux
- Immutable.js
- Bootstrap
- Ladda buttons
- Evil icons
