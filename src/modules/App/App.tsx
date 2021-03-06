import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Layout, LayoutGrid } from './Layout';
import { routesComponents } from './routes';
import { AppContextProvider } from './AppContext';
import { PageLoader, queryClient } from '../../shared';
import 'normalize.css';
import 'antd/dist/antd.css';

// Components
import { LazyMap } from '../Map';
import { LazyEarthImage } from '../EarthImage';
import { ErrorBoundary } from '../../shared/components/ErrorBoundary';

export const App: FC = () => {
  const element = useRoutes(routesComponents);

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <LayoutGrid>
                {element}
                <LazyMap />
                <LazyEarthImage />
              </LayoutGrid>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </QueryClientProvider>
    </AppContextProvider>
  );
};
