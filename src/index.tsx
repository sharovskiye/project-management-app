import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import ThemeContextWrapper from './providers';
import './i18n';

import { App } from './components/App';
import { store } from './store';

import './index.scss';
import './style/variables.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeContextWrapper>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </ThemeContextWrapper>
);
