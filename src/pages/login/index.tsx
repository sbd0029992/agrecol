/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import userServiceFactory from 'clientServices/userService';
import LoadingSpinner from 'components/LoadingSpinner';
import { AuthContext } from 'context/authContext';
import useUser from 'lib/useUser';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const userService = userServiceFactory();

function Index() {
  const { isLoggedIn } = useContext(AuthContext);
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentTime = Date.now();
    const sessionExpiry = user?.sessionExpiry || 0;

    if (
      ((isLoggedIn || user?.isLoggedIn) && router.pathname !== '/') ||
      currentTime > sessionExpiry
    ) {
      router.push('/');
    }
  }, [isLoggedIn, user?.isLoggedIn, user?.sessionExpiry, router.pathname]);

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor llene todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await userService.login(email, password);
      mutateUser(response.data);
      setLoading(false);
      router.push('/');
    } catch (error) {
      toast.error('El usuario o la contraseña son incorrectos');
      setLoading(false);
    }
  };

  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='hidden w-[50vw] flex-col items-center justify-center  px-10 py-4 md:flex '>
        <div className='w-full'>
          <img
            className='m-auto h-full w-full'
            src='/images/agrecol.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='w-full bg-secondary  px-10 py-4 text-text md:w-[50vw] '>
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <form onSubmit={handleSubmit}>
            <div className='flex w-full flex-col items-center justify-center gap-5 '>
              <img
                className='m-auto h-full w-full md:hidden'
                src='/images/agrecol.png'
                alt='logo'
              />
              <h1 className='self-start text-3xl font-bold '>Iniciar Sesión</h1>
              <h1 className='self-start text-lg  '>Usuario</h1>
              <input
                id='email'
                onChange={handleEmailChange}
                className='h-[50px] w-full rounded-md border-2  px-2 text-black '
                type='text'
                placeholder='cajero@gmail.com'
              />
              <h1 className='self-start text-lg '>Contraseña</h1>
              <input
                id='password'
                onChange={handlePasswordChange}
                className='h-[50px] w-full rounded-md border-2  px-2 text-black'
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
