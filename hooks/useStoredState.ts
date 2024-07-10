// TODO: make it so state updates when key is removed from localStorage
// (it currently only updates when the key's value is changed)

import {  Dispatch, SetStateAction, useEffect, useState } from 'react';

type StoredState<T> = [T, Dispatch<SetStateAction<T>>];

function useStoredState<T>(stateName: string, defaultValue?:T): StoredState<T> {
  const [value, setValue] = useState(defaultValue ?? null);

  const updateFromStorage = (key:string, force?:boolean) => {
    const storedValue = window.localStorage.getItem(window.location.pathname + '-' + key);
    if (storedValue) {
      try {
        setValue(JSON.parse(storedValue) as T);
      } catch (err) {
        setValue(storedValue as T);
      }
    } else if (force) {
      setValue(null);
    }
  }

  useEffect(() => {
    updateFromStorage(stateName);
    window.addEventListener("storage", e => {
      if (e.key === window.location.pathname + '-' + stateName) {
        updateFromStorage(stateName)
      }
    });

    return () => {
      window.removeEventListener("storage", e => {
        if (e.key === window.location.pathname + '-' + stateName) {
          updateFromStorage(stateName)
        }
      })
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
