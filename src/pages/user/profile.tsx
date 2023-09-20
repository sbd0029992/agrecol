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
        setNewUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dataCookie !== null) {
      getUser();
    }
  }, [query.id, dataCookie]);

  return (
    <div className='flex h-full min-h-[90vh] flex-col items-center justify-center'>
      <CardProfile
        id={newUser?._id || 'Loading...'}
        name={newUser?.name || 'Loading...'}
        ci={newUser?.ci || 'Loading...'}
        email={newUser?.email || 'Loading...'}
        date={newUser?.birthdate || 'Loading...'}
        phone={newUser?.phone || 'Loading...'}
      />
    </div>
  );
}

export default Profile;
