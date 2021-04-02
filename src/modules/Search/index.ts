import { lazy } from 'react';

export const LazySearch = lazy(async () => ({
  default: (await import('./Search' /* webpackChunkName: "Search" */)).Search,
}));
