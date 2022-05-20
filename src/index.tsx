import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './store';

import { SnackbarProvider } from 'notistack';
import { App } from './components/App';

import './index.scss';

import '../src/components/style/variables.css';
import ThemeContextWrapper from './providers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeContextWrapper>
    <StrictMode>
      <HashRouter>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </HashRouter>
    </StrictMode>
  </ThemeContextWrapper>
);
