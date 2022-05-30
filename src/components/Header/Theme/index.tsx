import { useEffect, useState } from 'react';

import { ThemeContext, themes } from '../../../providers';
import { SwitchTheme } from '../../SwitchTheme';

const getIsSwitchTheme = () => {
  const isSwitchLS = window?.localStorage?.getItem('isSwitchTheme');
  const isSwitch = isSwitchLS !== null ? JSON.parse(isSwitchLS) : true;
  return isSwitch;
};
export const Theme = () => {
  const [isChecked, setIsChecked] = useState(getIsSwitchTheme);

  useEffect(() => {
    localStorage.setItem('isSwitchTheme', JSON.stringify(isChecked));
  }, [isChecked]);
  return (
    <ThemeContext.Consumer>
      {({ changeTheme }) => (
        <SwitchTheme
          onChangeTheme={() => {
            const currentTheme = isChecked ? themes.light : themes.dark;

            setIsChecked((prevValue: boolean) => !prevValue);
            changeTheme(currentTheme);
          }}
          isChecked={isChecked}
        />
      )}
    </ThemeContext.Consumer>
  );
};
