import { RackProps } from 'interface/type';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RegisterRack: React.FC = () => {
  const { query, push } = useRouter();
  const [newRack, setNewRack] = useState<RackProps>({
    name: '',
    description: '',
    status: '',
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewRack({ ...newRack, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.id) {
      await updateUser();
    } else {
      await createRack();
    }
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
          />
          <h1 className='self-start text-lg text-gray-400'>
            Descripción Estante
          </h1>
          <input
            type='text'
            id='description'
            onChange={handleChange}
            value={newRack.description}
            className='h-[100px] w-full rounded-md border-2 border-fourtiary px-2  sm:h-2/6'
            placeholder='Descripción de estante'
          />

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
export default RegisterRack;
