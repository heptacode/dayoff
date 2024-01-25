import { useEffect, useState } from 'react';

export function useDebounceValue<T>(value: T, timeout = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [value, timeout]);

  return debouncedValue;
}

export function debounce<T extends (...args: any) => any>(fn: T, timeout = 500): T {
  let timer: NodeJS.Timeout;
  const callable = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
  return <T>(<any>callable);
}
