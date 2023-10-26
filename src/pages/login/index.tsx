/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import userServiceFactory from 'clientServices/userService';
import LoadingSpinner from 'components/LoadingSpinner';
import { AuthContext } from 'context/authContext';
import useUser from 'lib/useUser';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

const userService = userServiceFactory();

function Login() {
  const { isLoggedIn, userLoaded } = useContext(AuthContext);
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (isLoggedIn && pathname !== '/') {
      push('/');
    }
  }, [isLoggedIn, push]);

  useEffect(() => {
    if (userLoaded && (user?.isLoggedIn || isLoggedIn) && pathname !== '/') {
      push('/');
    }
  }, [user, userLoaded, isLoggedIn, push]);

  useEffect(() => {
    if (isLoggedIn) {
      push('/');
    }
  }, [isLoggedIn, push]);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userService.login(email, password);
      mutateUser(response.data);
    } catch (error: any) {
      alert(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userLoaded && (user?.isLoggedIn || isLoggedIn)) {
      push('/');
    }
  }, [user, userLoaded, isLoggedIn, push]);

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
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <form onSubmit={handleSubmit}>
            <div className='flex w-full flex-col items-center justify-center gap-5 '>
              <h1 className='self-start text-3xl font-bold'>Iniciar Sesión</h1>
              <h1 className='self-start text-lg text-gray-400'>
                Iniciar Sesión
              </h1>
              <input
                id='email'
                onChange={emailHandler}
                className='h-[50px] w-full rounded-md border-2  px-2'
                type='text'
                placeholder='cajero@gmail.com'
              />
              <h1 className='self-start text-lg text-gray-400'>Contraseña</h1>
              <input
                id='password'
                onChange={passwordHandler}
                className='h-[50px] w-full rounded-md border-2  px-2'
                type='password'
                placeholder='********'
              />
              <button
                type='submit'
                disabled={loading}
                className='h-[50px] w-[300px] rounded-md bg-primary text-white'
              >
                {loading ? <LoadingSpinner /> : 'Acceder'}
              </button>

              <p>¿Olvidaste tu contraseña?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
