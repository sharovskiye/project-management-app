import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ThemeContextWrapper from './providers';
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
