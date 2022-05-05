import styles from './styles.module.scss';

const { title, subTitle } = styles;

export const AboutCours = () => {
  return (
    <>
      <h3 className={title}>About Cours</h3>
      <p className={subTitle}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae odit ratione, neque esse
        perferendis ut facere velit voluptate odio nesciunt veritatis praesentium aspernatur
        nostrum? Quam doloremque consequatur excepturi vel eos?
      </p>
    </>
  );
};
