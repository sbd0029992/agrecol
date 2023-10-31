import { useServerSidePermission } from 'hooks/permission/useServerSidePermission';
import { RackProps } from 'interface/type';
import withSession from 'lib/session';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ListRack: React.FC = () => {
  const [newRack, setNewRack] = useState<RackProps[]>([]);
  const getRack = async () => {
    try {
      const res = await fetch(`/api/racks`);
      const racks = await res.json();
      const sortedRacks = racks.sort((a: RackProps, b: RackProps) =>
        a.name.localeCompare(b.name)
      );
      setNewRack(sortedRacks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRack();
  }, []);

  return (
    <div className='flex min-h-[90vh] flex-col items-center bg-gray-100 p-4'>
      {newRack && newRack.length ? (
        <div className='flex w-full flex-col'>
          <div className='mb-4'>
            <Link
              href='/rack/new'
              className='rounded bg-blue-500  py-2 px-4 text-white '
            >
              Registrar Estante
            </Link>
          </div>
          <div className='grid w-fit grid-cols-1 gap-8 place-self-center md:grid-cols-2 lg:grid-cols-3'>
            {newRack.map((rack: RackProps) => (
              <div
                key={rack._id}
                className='flex h-[200px] w-[250px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg'
              >
                <h1 className='mb-2 text-xl font-bold'>{rack.name}</h1>
                <p className='text-gray-700'>{rack.description}</p>
                <div className='mt-2 mb-2 flex flex-row items-center justify-center '>
                  <span
                    className={` mr-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                      rack.status === 1
                        ? 'bg-primary text-white'
                        : 'bg-red-400 text-white'
                    }`}
                  >
                    {rack.status === 1 ? 'Disponible' : 'No Disponible'}
                  </span>
                </div>
                <Link
                  className='mt-4 inline-block rounded bg-yellow-500 p-2 text-white hover:bg-yellow-700'
                  href={`/rack/${rack._id}/edit`}
                >
                  Editar
                </Link>
              </div>
            ))}
          </div>
          <div className='h-[50px] md:hidden'></div>
        </div>
      ) : (
        <p className='mt-4 text-gray-700'>No hay estantes registrados aún.</p>
      )}
    </div>
  );
};

export const getServerSideProps = withSession(useServerSidePermission);

export default ListRack;
