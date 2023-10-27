/* eslint-disable react-hooks/exhaustive-deps */
import { RackProps } from 'interface/type';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { useServerSidePermission } from 'pages/hooks/permission/useServerSidePermission';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegisterRack: React.FC = () => {
  const { query, push } = useRouter();
  const [newRack, setNewRack] = useState<RackProps>({
    name: '',
    description: '',
    status: 1,
  });

  const getRack = async () => {
    try {
      const res = await fetch(`/api/racks/${query.id}`);
      const { rack } = await res.json();
      setNewRack({
        name: rack.name,
        description: rack.description,
        status: rack.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getRack();
    }
  }, [query.id]);

  const createRack = async () => {
    try {
      const response = await fetch(`/api/racks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRack),
      });
      if (response.ok) {
        push('/rack/list');
        console.log('response', response);
        toast.success('Estante registrado');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`/api/racks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRack),
      });
      if (response.ok) {
        push('/rack/list');
        console.log('response', response);
        toast.success('Estante actualizado');
      } else {
        toast.error('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setNewRack({ ...newRack, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRack.name.trim() || !newRack.description.trim()) {
      toast.error('Los campos de nombre y descripción no pueden estar vacíos');
      return;
    }
    if (query.id) {
      await updateUser();
    } else {
      await createRack();
    }
  };

  const handleStatusChange = () => {
    setNewRack({ ...newRack, status: newRack.status === 1 ? 0 : 1 });
  };

  return (
    <div className='text m-auto flex h-full min-h-[90vh] w-full flex-col items-center justify-center px-10 py-4 sm:w-2/5  '>
      <form onSubmit={handleSubmit}>
        <div className='flex w-full flex-col items-center justify-center gap-5 '>
          <h1 className='-bold self-start text-3xl font-bold'>
            {query.id ? 'Actualizar Estante' : 'Registrar Estante'}
          </h1>
          <h1 className='self-start text-lg  text-gray-400'>Nombre Estante</h1>
          <input
            id='name'
            onChange={handleChange}
            value={newRack.name}
            className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2 sm:h-2/6'
            type='text'
            placeholder='Introducir nombre de estante'
            maxLength={20}
          />
          <h1 className='self-start text-lg text-gray-400'>
            Descripción Estante
          </h1>
          <textarea
            id='description'
            onChange={handleChange}
            value={newRack.description}
            className='h-[100px] w-full flex-wrap rounded-md border-2 border-fourtiary px-2 '
            placeholder='Descripción de estante'
            maxLength={60}
          />
          {query.id ? (
            <div className='flex items-center justify-between'>
              <label className='relative inline-flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  className='peer sr-only'
                  id='status'
                  value={newRack.status}
                  checked={newRack.status === 1}
                  onChange={handleStatusChange}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                <span className='ml-3 text-sm font-medium text-gray-900'>
                  {newRack.status === 1 ? 'Disponible' : 'No disponible'}
                </span>
              </label>
            </div>
          ) : null}

          <button
            type='submit'
            className='h-[50px] w-[300px] rounded-md bg-primary text-white'
          >
            {query.id ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = withSession(useServerSidePermission);
export default RegisterRack;
