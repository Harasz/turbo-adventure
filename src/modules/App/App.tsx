import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout, LayoutGrid } from './Layout';
import { routesComponents } from './routes';
import { AppContextProvider } from './AppContext';
import 'normalize.css';
import 'antd/dist/antd.css';

import { LazyMap } from '../Map';
import { LazyEarthImage } from './EarthImage';

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
            <LayoutGrid>
              {element}
              <LazyMap />
              <LazyEarthImage />
            </LayoutGrid>
          </Suspense>
        </Layout>
      </QueryClientProvider>
    </AppContextProvider>
  );
};
