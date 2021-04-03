import { lazy } from 'react';

export const LazyEarthImage = lazy(async () => ({
  default: (await import('./EarthImage' /* webpackChunkName: "EarthImage" */))
    .EarthImage,
}));
