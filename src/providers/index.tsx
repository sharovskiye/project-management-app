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

export default function ThemeContextWrapper({ children }: ThemeProviderPropsType) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme: string) {
    setTheme(theme);
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', `${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
