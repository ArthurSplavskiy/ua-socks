import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext';
import { UserProvider } from './context/UserContext';
import { CommonProvider } from './context/CommonContext';
import './assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CommonProvider>
      <UserProvider>
        <DeviceProvider>
          <RouterProvider router={AppRouter} />
        </DeviceProvider>
      </UserProvider>
    </CommonProvider>
  </React.StrictMode>
);
