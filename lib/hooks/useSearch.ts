import { useState, useEffect } from 'react';

interface UseSearchProps<T> {
  data: T[];
  searchKeys: (keyof T)[];
  debounce?: number;
}

export function useSearch<T>({ data, searchKeys, debounce = 300 }: UseSearchProps<T>) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<T[]>(data);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFiltered(data);
        return;
      }
      setFiltered(
        data.filter(item =>
          searchKeys.some(key =>
            String(item[key]).toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }, debounce);
    return () => clearTimeout(handler);
  }, [query, data, searchKeys, debounce]);

  return { query, setQuery, filtered };
}
