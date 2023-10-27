/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { NewUserProps } from 'interface/type';
import withSession from 'lib/session';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useServerSideLogin } from 'pages/hooks/permission/useServerSideLogin';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

const Register: React.FC = () => {
  const { query, push } = useRouter();
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUser, setNewUser] = useState<NewUserProps>({
    name: '',
    email: '',
    gender: '',
    birthdate: '',
    ci: '',
    phone: '',
    password: '',
  });
  const getUser = async () => {
    try {
      const res = await fetch(`/api/users/${query.id}`);
      const { user } = await res.json();
      setNewUser({
        name: user.name,
        email: user.email,
        gender: user.gender,
        birthdate: user.birthdate,
        ci: user.ci,
        phone: user.phone,
      });
      setShowPasswordField(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getUser();
    }
  }, [query.id]);

  const createUser = async () => {
    try {
      await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    const updatedUser = { ...newUser };
    delete updatedUser.password;
    try {
      await fetch(`/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setNewUser({ ...newUser, [id]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.gender ||
      !newUser.birthdate ||
      !newUser.ci ||
      !newUser.phone ||
      !newUser.password
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (query.id) {
      await updateUser();
      toast.success('Usuario actualizado con exito');
      push('/user/profile');
    } else {
      await createUser();
      toast.success('Usuario registrado con exito');
      push('/home');
    }
  };

  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='flex w-[50vw] flex-col items-center justify-center bg-secondary px-10 py-4 '>
        <div className='w-full bg-white'>
          <img
            className='m-auto h-full w-full'
            src='/images/agrecol.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='w-[50vw]  px-10 py-4 '>
        <Link href='/'>
          <p className='flex flex-row items-center gap-2 self-center'>
            <FaArrowLeft className='text-lg text-gray-400' />
            <p className='font-semibold text-gray-400'>Atrás</p>
          </p>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
            <div className='flex w-full flex-col items-center justify-center gap-5 '>
              <h1 className='self-start text-3xl font-bold'>Registro Cajero</h1>
              <h1 className='self-start text-lg text-gray-400'>
                Nombre Completo
              </h1>
              <input
                id='name'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='text'
                placeholder='Introducir su nombre completo'
                value={newUser.name}
                maxLength={60}
              />
              <h1 className='self-start text-lg text-gray-400'>Genero</h1>
              <select
                id='gender'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary bg-white  px-2'
                value={newUser.gender}
              >
                <option value='M' selected>
                  Masculino
                </option>
                <option value='F'>Femenino</option>
              </select>
              <h1 className='self-start text-lg text-gray-400'>
                Año de nacimiento
              </h1>
              <input
                id='birthdate'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='date'
                value={newUser.birthdate}
                min='1900-01-01'
                max={localDate}
              />
              <h1 className='self-start text-lg text-gray-400'>
                Carnet de Identidad
              </h1>
              <input
                id='ci'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='text'
                placeholder='Introducir su carnet de identidad'
                value={newUser.ci}
                maxLength={20}
              />
              <h1 className='self-start text-lg text-gray-400'>
                Teléfono Celular
              </h1>
              <input
                id='phone'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='number'
                placeholder='Introducir su numero de celular'
                value={newUser.phone}
              />
              <h1 className='self-start text-lg text-gray-400'>
                Correo Electronico
              </h1>
              <input
                id='email'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='email'
                placeholder='Introducir su correo electronico'
                value={newUser.email}
                maxLength={40}
              />
              {showPasswordField && (
                <React.Fragment>
                  <h1 className='self-start text-lg text-gray-400'>
                    Contraseña
                  </h1>
                  <input
                    id='password'
                    onChange={handleChange}
                    className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                    type='password'
                    placeholder='Introducir una contraseña'
                    value={newUser.password}
                    maxLength={60}
                  />
                  <h1 className='self-start text-lg text-gray-400'>
                    Confirmar Contraseña
                  </h1>
                  <input
                    id='confirmPassword'
                    onChange={handleChange}
                    className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                    type='password'
                    placeholder='Introducir una contraseña'
                    value={confirmPassword}
                    maxLength={60}
                  />
                </React.Fragment>
              )}
              <button
                type='submit'
                disabled={
                  !showPasswordField
                    ? false
                    : confirmPassword !== newUser.password ||
                      !newUser.password ||
                      !confirmPassword
                }
                className='h-[50px] w-[300px] rounded-md bg-primary text-white'
              >
                {query.id ? 'Actualizar' : 'Registrar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = withSession(useServerSideLogin);

export default Register;
