import { lazy } from 'react';

export const LazyMap = lazy(async () => ({
  default: (await import('./Map' /* webpackChunkName: "Search" */)).Map,
}));
