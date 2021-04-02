import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Layout } from './Layout';
import { routesComponents } from './routes';
import 'normalize.css';

export const App: FC = () => {
  const element = useRoutes(routesComponents);

  return (
    <Layout>
      <Suspense fallback="Loading...">{element}</Suspense>
    </Layout>
  );
};
