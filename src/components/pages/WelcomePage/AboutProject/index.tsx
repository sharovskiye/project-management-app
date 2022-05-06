import styles from './styles.module.scss';

const { title, subtitle } = styles;

export const AboutProject = () => {
  return (
    <>
      <h2 className={title}>About project</h2>
      <p className={subtitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium qui consequuntur saepe.
        Debitis cupiditate in nemo fuga quas voluptas alias quo? Nam voluptates excepturi
        repellendus placeat asperiores incidunt maxime ratione!
      </p>
    </>
  );
};
