import styles from './styles.module.scss';
import { Designe } from '../designe/designe';
export function App() {
  return (
    <>
      <h1 className={styles.testClass}>project-management-app</h1>
      <Designe />
    </>
  );
}
