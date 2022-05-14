import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [opened, setOpened] = useState(initialValue);

  const onToggle = useCallback(() => {
    setOpened((prevValue) => !prevValue);
  }, []);

  return { opened, onToggle };
}
