import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes.js';
import { MyProvider } from './global/contexto/MyProvider.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
      <AppRoutes />
    </MyProvider>
  </React.StrictMode>
);
