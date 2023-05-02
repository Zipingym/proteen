import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import CustomRouter from './router/router';
import ScrollTop from './components/scroll/scroll';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTop />
      <CustomRouter />
    </BrowserRouter>
  </React.StrictMode>
);
