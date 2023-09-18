import { ResponseType } from 'interface/type';
import { useEffect, useState } from 'react';

export const useFetchData = <T,>(url: string): ResponseType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const result: T = await res.json();
          setData(result);
        } catch (error) {
          setError(error as Error);
        }
      };
      fetchData();
    }
  }, [url]);

  return { data, error };
};
