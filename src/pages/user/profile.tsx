/* eslint-disable react-hooks/exhaustive-deps */

import CardProfile from 'components/CardProfile';
import { NewUserProps } from 'interface/type';
import { useRouter } from 'next/router';
import UseUserDataCookie from 'pages/hooks/userCookieData/userData';
import React, { useEffect, useState } from 'react';

function Profile() {
  const { query } = useRouter();
  const [newUser, setNewUser] = useState<NewUserProps>();
  const dataCookie = UseUserDataCookie();
  const getUser = async () => {
    try {
      if (dataCookie?.idUser) {
        const res = await fetch(`/api/users/${dataCookie.idUser}`);
        const data = await res.json();
        setNewUser(data.user); // Accede a la propiedad 'user' aquí
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataCookie?.idUser && query.id) {
      getUser();
    }
  }, [query.id, dataCookie]);

  return (
    <div className='flex h-full min-h-[90vh] flex-col items-center justify-center'>
      <CardProfile
        name={newUser?.name || 'Loading...'}
        ci='10101010'
        email='pepito@gmail.com'
        date='10/10/1990'
        phone='70707070'
      />
    </div>
  );
}

export default Profile;
