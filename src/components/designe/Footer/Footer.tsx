import { Link } from '@mui/material';
import style from '../style.module.scss';

export const Footer = () => {
  return (
    <div className={`${style.container} ${style.container__medium}  ${style.footer}`}>
      <div className={style.footer_githubBlock}>
        <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
        <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
        <Link className={`${style.footer_link} ${style.link}`}>GITHUB</Link>
      </div>
      <div className={style.footer_year}>
        <p>2022</p>
      </div>
      <div className={style.footer_rssCourse}>
        <Link className={`${style.footer_link} ${style.link}`}>RSS</Link>
      </div>
    </div>
  );
};
