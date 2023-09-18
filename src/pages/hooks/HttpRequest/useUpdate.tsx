import { UseMutationResponse } from 'interface/type';
import { useState } from 'react';

export const useUpdateData = <T,>(
  url: string,
  payload: T
): UseMutationResponse<T> => {
  const [response, setResponse] = useState<Response | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const updateData = async () => {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setResponse(res);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { response, error, mutate: updateData };
};
