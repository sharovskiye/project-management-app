import { memo } from 'react';
import styles from './styles.module.scss';

export type IPerson = {
  src: string;
  name: string;
  description: string;
};

export const Person = memo(({ src, name, description }: IPerson) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img
          className={styles.image}
          src={src.length > 0 ? src : 'https://mi-lab.org/wp-content/uploads/2015/07/contact.png'}
          alt={name}
        />
      </div>

      <div className={styles.wrapperContainer}>
        <h4 className={styles.title}>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
});
