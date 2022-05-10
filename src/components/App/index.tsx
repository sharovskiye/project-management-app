import { Route, Routes } from 'react-router-dom';

import { WelcomePage } from '../pages/WelcomePage';
import { MainPage } from '../pages/MainPage';
import { Form } from '../Form';

import styles from './styles.module.scss';

export function App() {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}
