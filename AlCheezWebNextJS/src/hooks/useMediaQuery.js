import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  // Initialize state with a default value
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (i.e., client-side)
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      const documentChangeHandler = () => setMatches(mediaQueryList.matches);

      // Set initial matches value
      setMatches(mediaQueryList.matches);

      // Add event listener
      mediaQueryList.addEventListener('change', documentChangeHandler);

      // Clean up event listener
      return () => {
        mediaQueryList.removeEventListener('change', documentChangeHandler);
      };
    }
  }, [query]);

  return matches;
}
