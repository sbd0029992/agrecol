/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useServerSidePermission } from 'hooks/permission/useServerSidePermission';
import { NewUserProps } from 'interface/type';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

const Register: React.FC = () => {
  const { query, push } = useRouter();
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newUser, setNewUser] = useState<NewUserProps>({
    name: '',
    email: '',
    gender: 'M',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const createUser = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Usuario registrado con éxito');
        push('/');
      } else {
        toast.error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message + 'algo paso');
    }
  };

  const updateUser = async () => {
    const updatedUser = { ...newUser };
    delete updatedUser.password;

    try {
      const response = await fetch(`/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Usuario actualizado con éxito');
        push('/user/profile');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al actualizar usuario');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      // Comprueba si las contraseñas coinciden y actualiza el mensaje de error
      setPasswordError(
        value === newUser.password ? '' : 'Las contraseñas no coinciden'
      );
    } else if (id === 'password') {
      setNewUser({ ...newUser, password: value });
      // Comprueba si las contraseñas coinciden y actualiza el mensaje de error
      setPasswordError(
        confirmPassword === value ? '' : 'Las contraseñas no coinciden'
      );
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
      !newUser.phone
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (query.id) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className=' hidden w-[50vw] flex-col items-center justify-center px-10 py-4 md:flex '>
        <div className='w-full '>
          <img
            className='m-auto h-full w-full'
            src='/images/agrecol.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='w-full  bg-secondary px-0  py-4 text-text md:w-[50vw] md:px-10 '>
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
                maxLength={100}
                pattern='[A-Za-z\s]+'
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
                maxLength={14}
              />
              <h1 className='self-start text-lg text-gray-400'>
                Teléfono Celular
              </h1>
              <input
                id='phone'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='text'
                placeholder='Introducir su numero de celular'
                value={newUser.phone}
                minLength={8}
                maxLength={8}
                pattern='[0-9]{8}'
                inputMode='numeric'
              />

              <h1 className='self-start text-lg text-gray-400'>Usuario</h1>
              <input
                id='email'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='text'
                placeholder='Introducir su usuario'
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
                  {passwordError && (
                    <p className='text-red-500'>{passwordError}</p> // Mensaje de error estilizado
                  )}
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
                className={`h-[50px] w-[300px] rounded-md ${
                  showPasswordField &&
                  (confirmPassword !== newUser.password ||
                    !newUser.password ||
                    !confirmPassword)
                    ? 'bg-gray-400'
                    : 'bg-primary'
                } text-white`}
              >
                {query.id ? 'Actualizar' : 'Registrar'}
              </button>

              <div className='h-[50px]  md:hidden'></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = withSession(useServerSidePermission);

export default Register;
