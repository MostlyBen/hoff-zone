"use client"

// TODO: make it so state updates when key is removed from localStorage
// (it currently only updates when the key's value is changed)

import {  Dispatch, SetStateAction, useEffect, useState } from 'react';

type StoredState<T> = [T, Dispatch<SetStateAction<T>>];

function useStoredState<T>(stateName: string, defaultValue?:T, pathSpecific:boolean = true): StoredState<T> {
  const [value, setValue] = useState(defaultValue ?? null);
  // don't have window on pre-render (serverside) so, avoid that error
  const key = (pathSpecific && typeof window !== 'undefined')
              ? window.location.pathname + '-' + stateName
              : stateName

  const updateFromStorage = (_key:string, force?:boolean) => {
    const storedValue = window.localStorage.getItem(_key);
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
    updateFromStorage(key);
    // useEffect doesn't run on server-side renders, so this is okay
    window.addEventListener("storage", e => {
      if (e.key === key) {
        updateFromStorage(key)
      }
    });

    return () => {
      window.removeEventListener("storage", e => {
        if (e.key === key) {
          updateFromStorage(key)
        }
      })
    }
  }, [key])

  // This function will be a problem if it ever has a reason to run server-side
  // Like, if it's updated outside of an event or useEffect
  // But that probably won't happen
  const updateValue = (newValue: any) => {
    setValue(newValue);
    if (newValue !== null) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } else {
      window.localStorage.removeItem(key)
    }
  }

  return [value, updateValue];
}

export default useStoredState;
