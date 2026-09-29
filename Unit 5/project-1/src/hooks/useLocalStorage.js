import { useState, useEffect } from "react";

/**
 * useLocalStorage
 * A generic hook that behaves like useState but persists its value
 * to localStorage under the given key, and reads any existing value
 * back on first render.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: failed to read "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`useLocalStorage: failed to write "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
