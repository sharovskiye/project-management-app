import { Person } from '../Person';
import { IPerson } from '../Person';
import { teamMembers } from './const';

import styles from './styles.module.scss';

export const AboutTeam = () => {
  return (
    <>
      <h2 className={styles.title}>About team</h2>
      <div className={styles.wrapper}>
        {teamMembers.map((items: IPerson) => {
          return <Person {...items} key={items.name} />;
        })}
      </div>
    </>
  );
};
