import { DataCookieType } from 'interface/type';
import { useEffect, useState } from 'react';

export default function UseUserDataCookie(): DataCookieType | null {
  const [newUser, setNewUser] = useState<DataCookieType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/user');
      const data = await res.json();
      setNewUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return newUser;
}
