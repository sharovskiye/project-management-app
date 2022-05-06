import styles from './styles.module.scss';

const { image, title } = styles;

export type IPerson = {
  src: string;
  name: string;
  description: string;
};

export const Person = ({ src, name, description }: IPerson) => {
  return (
    <div>
      <img
        className={image}
        src={src.length > 0 ? src : 'https://mi-lab.org/wp-content/uploads/2015/07/contact.png'}
        alt={name}
      />
      <h4 className={title}>{name}</h4>
      <p>{description}</p>
    </div>
  );
};
