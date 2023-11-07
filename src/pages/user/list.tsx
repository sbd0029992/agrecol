import axios from 'axios';
import CardCashier from 'components/CardCashier';
import { useServerSidePermission } from 'hooks/permission/useServerSidePermission';
import { NewUserProps } from 'interface/type';
import withSession from 'lib/session';
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
      <div>
        <div className='flex flex-wrap items-center justify-center gap-4'>
          {newCashiers.map((cashier) => (
            <CardCashier
              key={cashier._id}
              _id={cashier._id}
              name={cashier.name}
            />
          ))}
        </div>
        <div className='h-[100px] md:hidden'></div>
      </div>
    </div>
  );
}

export const getServerSideProps = withSession(useServerSidePermission);

export default List;
