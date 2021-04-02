import React from 'react';
import { PartialRouteObject, Navigate } from 'react-router';
import { LazySearch } from '../../Search';
import { routesPaths } from './routesPaths';

const stripParent = (parentPath: string, childPath: string): string => {
  if (!childPath.startsWith(parentPath)) {
    throw new Error('Parent path mismatch');
  }
  const result = childPath.slice(parentPath.length);
  return result.startsWith('/') ? result.slice(1) : result;
};

export const routesComponents: PartialRouteObject[] = [
  {
    path: routesPaths.INDEX,
    element: <Navigate to={routesPaths.SEARCH} />,
  },
  {
    path: stripParent(routesPaths.INDEX, routesPaths.SEARCH),
    element: <LazySearch />,
  },
];
