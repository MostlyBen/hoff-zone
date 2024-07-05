import { useEffect, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
const useStoredState = (stateName: string, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(window.location.pathname + '-' + stateName);
    if (storedValue) {
      setValue(
        JSON.parse(storedValue)
      )
    }
  }, [stateName])

  const updateValue = (newValue: any) => {
    setValue(newValue);
    if (newValue !== null) {
      window.localStorage.setItem(window.location.pathname + '-' + stateName, JSON.stringify(newValue));
    } else {
      window.localStorage.removeItem(window.location.pathname + '-' + stateName)
    }
  }

  return [value, updateValue];
}

export default useStoredState;
