import { createContext, ReactNode, useEffect, useState } from 'react';

export const themes = {
  dark: 'darkTheme',
  light: 'lightTheme',
};
export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: (theme: string) => {},
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

export default function ThemeContextWrapper({ children }: ThemeProviderPropsType) {
  const [theme, setTheme] = useState(getTheme);

  function changeTheme(theme: string) {
    setTheme(theme);
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', `${theme}`);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
