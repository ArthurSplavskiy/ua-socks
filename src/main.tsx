import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext';
import { UserProvider } from './context/UserContext';
import { CommonProvider } from './context/CommonContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import './assets/styles/index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CommonProvider>
      <UserProvider>
        <DeviceProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={AppRouter} />
          </QueryClientProvider>
        </DeviceProvider>
      </UserProvider>
    </CommonProvider>
  </React.StrictMode>
);
