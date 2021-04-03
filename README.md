# Turbo Adventure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install

To install this project we need to download the repository to our machine and install dependencies.
NPM or Yarn is required.

```
git clone https://github.com/Harasz/turbo-adventure.git
cd turbo-adventure
yarn or npm install
```

Create `.env` from template `.env.template` and fill all values.

## Start dev

After installation we can start project in development mode with this command

```
yarn start
```

## Deployment

Before deployment we have to create production build with this command

```
yarn build
```

Production ready build will be in `dist` folder.

## Used API

Location API: [Mapbox](https://docs.mapbox.com/api/overview/).

Earth Image: [NASA Earth API](https://api.nasa.gov/).

Map component: [OpenStreetMap](https://www.openstreetmap.org/).

## Summary

I used `antd` as a UI library along with `styled-components`. I also used `react-router` which was redundant, but I also wanted to show the skill of configuring this package, also in the `@next` version. Due to limitations in the Location API, I've used `react-query` to reduce queries and cache response.
