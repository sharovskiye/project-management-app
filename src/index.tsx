import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { App } from './components/App';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <HashRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </HashRouter>
  </StrictMode>
);
