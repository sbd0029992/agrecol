/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { NewUserProps } from 'interface/type';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const { query, push } = useRouter();
  const [newUser, setNewUser] = useState<NewUserProps>({
    password: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: newUser.password,
    newPassword: '',
    confirmPassword: '',
  });

  const getUser = async () => {
    try {
      const res = await fetch(`/api/users/${query.id}`);
      const { user } = await res.json();
      setNewUser({
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getUser();
    }
  }, [query.id]);

  const handleChangePassword = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.id) {
      await updatePassword();
    }
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`/api/users/pass`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: query.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('error completo:', errorData.error);
        toast.error(errorData.error);
      } else {
        toast.success('Contraseña actualizada');
        console.log('Contraseña actualizada');
        push('/api/auth/logout');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex h-full min-h-[90vh] flex-row'>
      <div className='flex w-[50vw] flex-col items-center justify-center bg-secondary px-10 py-4 '>
        <div className='w-full bg-white'>
          <img
            className='m-auto h-full w-full'
            src='/images/agrecol.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='w-[50vw]  px-10 py-4  '>
        <Link href='/'>
          <p className='flex flex-row items-center gap-2 self-center'>
            <FaArrowLeft className='text-lg text-gray-400' />
            <p className='font-semibold text-gray-400'>Atrás</p>
          </p>
        </Link>
        <form onSubmit={handleSubmit} className='h-[95%]'>
          <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
            <div className='flex w-full flex-col items-center justify-center gap-5 '>
              <div>
                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-black'>
                    CONTRASEÑA ACTUAL
                  </label>
                  <input
                    type='password'
                    id='currentPassword'
                    value={passwordData.currentPassword}
                    onChange={handleChangePassword}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                    required
                  />
                </div>

                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-black'>
                    NUEVA CONTRASEÑA
                  </label>
                  <input
                    type='password'
                    id='newPassword'
                    value={passwordData.newPassword}
                    onChange={handleChangePassword}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                    required
                  />
                </div>

                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-black'>
                    CONFIRMAR NUEVA CONTRASEÑA
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    value={passwordData.confirmPassword}
                    onChange={handleChangePassword}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                    required
                  />
                </div>

                <button
                  className='mt-6 w-full rounded-lg bg-blue-500 p-2.5 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                  onClick={updatePassword}
                >
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
