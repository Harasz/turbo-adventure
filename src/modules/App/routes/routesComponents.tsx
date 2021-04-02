import React from 'react';
import { PartialRouteObject } from 'react-router';
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
    element: <div>dashbord</div>,
  },
];
