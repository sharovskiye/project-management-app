import { createContext, ReactNode, useEffect, useState } from 'react';

export const themes = {
  dark: 'darkTheme',
  light: 'lightTheme',
};
export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: (theme: string, isChecked: string) => {},
});

type ThemeProviderPropsType = {
  children: ReactNode;
};

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (Object.values(themes).includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');
  if (userMedia.matches) return themes.light;

  return themes.dark;
};

const getIsSwitchTheme = () => {
  const isSwitch = `${window?.localStorage?.getItem('isSwitchTheme')}`;
  return isSwitch;
};

export default function ThemeContextWrapper({ children }: ThemeProviderPropsType) {
  const [theme, setTheme] = useState(getTheme);
  const [isChecked, setIsChecked] = useState(getIsSwitchTheme);

  function changeTheme(theme: string, isChecked: string) {
    setTheme(theme);
    setIsChecked(isChecked);
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', `${theme}`);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    localStorage.setItem('isSwitchTheme', `${isChecked}`);
  }, [theme, isChecked]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
