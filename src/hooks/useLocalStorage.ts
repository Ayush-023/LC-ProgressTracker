import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      console.warn(`Failed to parse localStorage key "${key}", using initial value`);
      return initialValue;
    }
  });

  const updateValue = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const val = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (err) {
        console.error(`Failed to save to localStorage key "${key}":`, err);
      }
      return val;
    });
  };

  return [value, updateValue] as const;
}

export default useLocalStorage;