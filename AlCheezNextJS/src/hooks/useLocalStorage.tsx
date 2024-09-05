import { useEffect, useState } from "react";

// Generic useLocalStorage hook
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with a default value to handle server-side rendering
  const [value, setValue] = useState<T>(() => {
    // Check if window and localStorage are available
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }

    // Return initialValue if localStorage is not available or if key doesn't exist
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    // Only run this effect on the client-side
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
