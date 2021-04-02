import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from './Layout';
import { routesComponents } from './routes';
import { AppContextProvider } from './AppContext';
import 'normalize.css';
import 'antd/dist/antd.css';

import { LazyMap } from '../Map';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

export const App: FC = () => {
  const element = useRoutes(routesComponents);

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Suspense fallback="Loading...">
            {element}
            <LazyMap />
          </Suspense>
        </Layout>
      </QueryClientProvider>
    </AppContextProvider>
  );
};
