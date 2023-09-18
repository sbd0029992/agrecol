import { UseMutationResponse } from 'interface/type';
import { useState } from 'react';

export const usePostData = <T,>(
  url: string,
  payload: T
): UseMutationResponse<T> => {
  const [response, setResponse] = useState<Response | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const postData = async () => {
    try {
      const res = await fetch(url, {
        method: 'POST',
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

  return { response, error, mutate: postData };
};
