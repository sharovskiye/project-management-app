import { Person } from '../Person';
import { IPerson } from '../Person';
import { teamMembers } from './const';

import styles from './styles.module.scss';

const { wrapper, title } = styles;

export const AboutTeam = () => {
  return (
    <>
      <h2 className={title}>About team</h2>
      <div className={wrapper}>
        {teamMembers.map((items: IPerson) => {
          return <Person {...items} key={items.name} />;
        })}
      </div>
    </>
  );
};
