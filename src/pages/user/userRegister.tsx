/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import { NewUserProps } from 'interface/type';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

// Define el estilo del contenedor del mapa
const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

// Coordenadas iniciales (puedes cambiarlas según tu preferencia)
const initialCenter = {
  lat: -17.404357772400502,
  lng: -66.14837526944187,
};

const UserRegister: React.FC = () => {
  const libraries = useMemo(() => ['places'], []);
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
    latitude: 0,
    longitude: 0,
  });

  const [loading, setLoading] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [centerMap, setCenterMap] = useState(initialCenter);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
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
        latitude: user.latitude,
        longitude: user.longitude,
      });
      setShowPasswordField(false);
      setCenterMap({
        lat: parseFloat(user.latitude),
        lng: parseFloat(user.longitude),
      });
      setMarkerPosition({
        lat: parseFloat(user.latitude),
        lng: parseFloat(user.longitude),
      });
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

  useEffect(() => {
    // Obtener la ubicación actual del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setCenterMap(location);
          setMarkerPosition(location);
          setNewUser((prevUser) => ({
            ...prevUser,
            latitude: location.lat,
            longitude: location.lng,
          }));
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordError(
        value === newUser.password ? '' : 'Las contraseñas no coinciden'
      );
    } else if (id === 'password') {
      setNewUser({ ...newUser, password: value });
      setPasswordError(
        confirmPassword === value ? '' : 'Las contraseñas no coinciden'
      );
    } else if (id === 'name') {
      if (/^[A-Za-z\s]*$/.test(value)) {
        setNewUser({ ...newUser, [id]: value });
      }
    } else if (id === 'phone') {
      if (/^[0-9]*$/.test(value)) {
        setNewUser({ ...newUser, [id]: value });
      }
    } else {
      setNewUser({ ...newUser, [id]: value });
    }
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      setNewUser((prevUser) => ({
        ...prevUser,
        latitude: lat,
        longitude: lng,
      }));
    }
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users', newUser);
      setLoading(false);
      toast.success('Usuario registrado con éxito');
      if (response.status === 201) {
        push('/');
      }
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error('Algo salió mal');
      }
    }
  };

  const updateUser = async () => {
    const updatedUser = { ...newUser };
    delete updatedUser.password;

    try {
      setLoading(true);
      const response = await fetch(`/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success('Usuario actualizado con éxito');
        push('/user/profile');
      } else {
        toast.error(data.message || 'Error al actualizar el usuario');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Error al actualizar usuario');
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
      (!query.id && !newUser.password) ||
      !newUser.latitude ||
      !newUser.longitude
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (!query.id && newUser.password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (query.id) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const handleUpdateLocation = (lat: number, lng: number) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleLocationButtonClick = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Actualiza la ubicación en el estado de newUser
        handleUpdateLocation(latitude, longitude);

        setUserLocation({
          lat: latitude,
          lng: longitude,
        });

        setMarkerPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      () => {
        alert('Unable to retrieve your location');
      }
    );
  };
  const CustomLocationButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      type='button'
      className='rounded-lg bg-blue-300  px-3'
    >
      Tu Ubicacion
    </button>
  );

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className='flex h-full min-h-screen flex-row'>
      <div className='hidden w-[50vw] flex-col items-center justify-center px-10 py-4 md:flex'>
        <div className='w-full'>
          <img
            className='m-auto h-full w-full'
            src='/images/agrecol.png'
            alt='logo'
          />
        </div>
      </div>
      <div className='w-full bg-secondary px-0 py-4 text-text md:w-[50vw] md:px-10'>
        <form onSubmit={handleSubmit}>
          <div className='m-auto flex h-[99%] w-3/4 flex-col items-center justify-center'>
            <div className='flex w-full flex-col items-center justify-center gap-5'>
              <h1 className='self-start text-3xl font-bold'>Registro Cajero</h1>
              <h1 className='self-start text-lg text-gray-400'>
                Nombre Completo
              </h1>
              <input
                id='name'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                type='text'
                placeholder='Introducir su nombre completo'
                value={newUser.name}
                minLength={5}
                maxLength={100}
                pattern='[A-Za-z\s]+'
                required
              />
              <h1 className='self-start text-lg text-gray-400'>Género</h1>
              <select
                id='gender'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary bg-white px-2'
                value={newUser.gender}
                required
              >
                <option value='M'>Masculino</option>
                <option value='F'>Femenino</option>
              </select>
              <h1 className='self-start text-lg text-gray-400'>
                Fecha de Nacimiento
              </h1>
              <input
                id='birthdate'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                type='date'
                value={newUser.birthdate}
                min='1900-01-01'
                max={new Date().toISOString().split('T')[0]}
                required
              />
              <h1 className='self-start text-lg text-gray-400'>
                Carnet de Identidad
              </h1>
              <input
                id='ci'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                type='text'
                placeholder='Introducir su carnet de identidad'
                value={newUser.ci}
                maxLength={14}
                required
              />
              <h1 className='self-start text-lg text-gray-400'>
                Teléfono Celular
              </h1>
              <input
                id='phone'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                type='text'
                placeholder='Introducir su número de celular'
                value={newUser.phone}
                minLength={8}
                maxLength={8}
                pattern='[0-9]{8}'
                inputMode='numeric'
                required
              />
              <h1 className='self-start text-lg text-gray-400'>Usuario</h1>
              <input
                id='email'
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                type='email'
                placeholder='Introducir su correo electrónico'
                value={newUser.email}
                maxLength={40}
                required
              />
              {showPasswordField && (
                <React.Fragment>
                  <h1 className='self-start text-lg text-gray-400'>
                    Contraseña
                  </h1>
                  <input
                    id='password'
                    onChange={handleChange}
                    className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                    type='password'
                    placeholder='Introducir una contraseña'
                    value={newUser.password}
                    maxLength={60}
                    required
                  />
                  <h1 className='self-start text-lg text-gray-400'>
                    Confirmar Contraseña
                  </h1>
                  <input
                    id='confirmPassword'
                    onChange={handleChange}
                    className='h-[50px] w-full rounded-md border-2 border-fourtiary px-2'
                    type='password'
                    placeholder='Confirmar la contraseña'
                    value={confirmPassword}
                    maxLength={60}
                    required
                  />
                  {passwordError && (
                    <p className='text-red-500'>{passwordError}</p>
                  )}
                </React.Fragment>
              )}

              {/* Sección del Mapa */}
              <div className='w-full'>
                <h1 className='self-start text-lg text-gray-400'>
                  Selecciona tu ubicación
                </h1>
                <div className='mb-2 flex flex-col items-start justify-between sm:flex-row sm:items-center'>
                  <label className='mb-2 block text-sm font-medium text-gray-500 dark:text-white sm:mb-0'>
                    UBICACION
                  </label>
                  <CustomLocationButton onClick={handleLocationButtonClick} />
                </div>
                <div className='h-[300px] w-full sm:h-[400px] md:h-[500px]'>
                  <GoogleMap
                    mapContainerStyle={{
                      ...mapContainerStyle,
                      height: '100%',
                    }}
                    zoom={14}
                    center={markerPosition || centerMap}
                    onClick={(e) => {
                      if (e.latLng) {
                        const lat = e.latLng.lat();
                        const lng = e.latLng.lng();
                        setMarkerPosition({ lat, lng });
                        setNewUser((prevUser) => ({
                          ...prevUser,
                          latitude: lat,
                          longitude: lng,
                        }));
                      }
                    }}
                  >
                    <MarkerF
                      position={markerPosition || centerMap}
                      draggable
                      onDragEnd={handleMarkerDragEnd}
                    />
                  </GoogleMap>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`h-[50px] w-full rounded-md ${
                  loading ? 'bg-gray-400' : 'bg-primary'
                } text-white`}
              >
                {loading
                  ? 'Procesando...'
                  : query.id
                  ? 'Actualizar'
                  : 'Registrar'}
              </button>

              <div className='h-[50px] md:hidden'></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
