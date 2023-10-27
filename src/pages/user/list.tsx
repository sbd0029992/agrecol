import axios from 'axios';
import CardCashier from 'components/CardCashier';
import { NewUserProps } from 'interface/type';
import withSession from 'lib/session';
import { useServerSidePermission } from 'pages/hooks/permission/useServerSidePermission';
import React, { useEffect, useState } from 'react';

function List() {
  const [newCashiers, setDataNewCashiers] = useState<NewUserProps[]>([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios('/api/users');
        const { data } = response;
        setDataNewCashiers(data);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    getUser();
  }, []);

  return (
    <div className='flex h-full min-h-[90vh] w-full items-center justify-center'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {newCashiers.map((cashier) => (
          <CardCashier
            key={cashier._id}
            _id={cashier._id}
            name={cashier.name}
          />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = withSession(useServerSidePermission);

export default List;
