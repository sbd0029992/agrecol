import { RackProps } from 'interface/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ListRack: React.FC = () => {
  const [newRack, setNewRack] = useState<RackProps[]>([]);
  const getRack = async () => {
    try {
      const res = await fetch(`/api/racks`);
      const racks = await res.json();
      setNewRack(racks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRack();
  }, []);

  if (newRack.length < 0) {
    return (
      <div>
        <Link
          className='absolute top-5 left-5 rounded bg-blue-500 p-2 text-white hover:bg-blue-700'
          href='/rack/new'
        >
          Registrar Estante
        </Link>
      </div>
    );
  }

  return (
    <div className='flex min-h-[90vh] flex-col items-center bg-gray-100 p-4'>
      {newRack && newRack.length ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {newRack.map((rack: RackProps) => (
            <div
              key={rack._id}
              className='flex h-[200px] w-[200px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg'
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
      ) : (
        <p className='mt-4 text-gray-700'>No hay estantes registrados aún.</p>
      )}
    </div>
  );
};

export default ListRack;
