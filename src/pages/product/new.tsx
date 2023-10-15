/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import LoadingSpinner from 'components/LoadingSpinner';
import { ProductProps, RackProps } from 'interface/type';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function RegisterProduct() {
  const { query, push } = useRouter();
  const [racks, setRacks] = useState<RackProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<{ id: string }>({ id: '' });
  const [productImages, setProductImages] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<ProductProps>({
    name: '',
    description: '',
    rack: '',
    receptionDate: '',
    weight: '',
    price: 0,
    status: 1,
    photos: query.id ? [] : [],
  });
  async function fetchTrucks() {
    const response = await fetch(`/api/racks?status=1`);
    const data = await response.json();
    setRacks(data);
  }

  useEffect(() => {
    fetchTrucks();
  }, []);

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/products/${query.id}`);
      const { product } = await res.json();
      setIdProduct({ id: product._id });
      setProductImages(product.photos);
      const formattedDate = new Date(product.receptionDate)
        .toISOString()
        .split('T')[0];
      setNewProduct({
        name: product.name,
        description: product.description,
        rack: product.rack,
        receptionDate: formattedDate,
        weight: product.weight,
        price: product.price,
        status: product.status,
        photos: product.photos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === 'photos') {
      setNewProduct({ ...newProduct, [id]: [value] });
    } else if (id === 'status') {
      setNewProduct({ ...newProduct, [id]: value === '1' ? '1' : '0' });
    } else {
      setNewProduct({ ...newProduct, [id]: value });
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      (response.status === 200 || response.status === 201) &&
        toast.success('Producto creado con éxito');
      push('/product/list');
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (product: ProductProps) => {
    try {
      const response = await fetch(`/api/products/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      (response.status === 200 || response.status === 201) &&
        toast.success('Producto actualizado con éxito');
      push('/product/list');
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  // Función para subir una imagen a S3 y devolver la URL
  async function uploadToS3(file: any, id: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    try {
      const response = await fetch(`/api/s3/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.imageUrl; // Asume que tu API devuelve la URL de la imagen
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function handleRemoveImageS3(index: any) {
    const imageToDelete = newProduct.photos[index];
    const fileName = imageToDelete.split('/').pop();
    const key = `${idProduct.id}/${fileName}`;

    try {
      await fetch(`/api/s3/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      console.log('Image deleted from S3');

      const updatedImageUrls = newProduct.photos.filter(
        (imageUrl: any) => imageUrl !== imageToDelete
      );
      setNewProduct({ ...newProduct, photos: updatedImageUrls });
      await updateProduct({ ...newProduct, photos: updatedImageUrls });
    } catch (error) {
      console.error('Error deleting image from S3:', error);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    if (query.id) {
      if (selectedImages[0]) {
        const imageUrl = await uploadToS3(
          selectedImages[0],
          idProduct.id.toString()
        );

        const updatedProduct = {
          ...newProduct,
          photos: [...newProduct.photos, imageUrl],
        };

        await updateProduct(updatedProduct);

        setNewProduct(updatedProduct);
      } else {
        await updateProduct(newProduct);
      }
    } else {
      await createProduct();
    }
  };

  useEffect(() => {
    const updateProductWithImages = async () => {
      await updateProduct(newProduct);
      setIsSubmitting(false);
    };

    if (query.id && newProduct.photos.length > 0 && isSubmitting) {
      updateProductWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProduct.photos, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index: any) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newProduct.photos];
    updatedImageUrls.splice(index, 1);
    setNewProduct({ ...newProduct, photos: updatedImageUrls });
    const element = document.getElementById('photos');
    if (element && 'value' in element) {
      (element as HTMLInputElement).value = '';
    }
  }

  const handleStatusChange = () => {
    setNewProduct({ ...newProduct, status: newProduct.status === 1 ? 0 : 1 });
  };

  return (
    <div className='m-auto flex h-full min-h-[90vh] w-1/2 flex-col py-2'>
      <div className='w-full self-center px-10 '>
        <div className='m-auto flex h-[99%] w-3/4 flex-col items-center  justify-center'>
          <form className='w-full' onSubmit={handleSubmit}>
            <div className='flex w-full flex-col items-center justify-center gap-3 '>
              <h1 className='text-bold self-start text-3xl'>
                {query.id ? 'Actualizar Producto' : 'Registrar Producto'}
              </h1>
              <h1 className='self-start text-lg text-gray-400'>Nombre</h1>
              <input
                id='name'
                value={newProduct.name}
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='text'
                placeholder='Ingrese el nombre del producto'
              />
              <h1 className='self-start text-lg text-gray-400'>
                Descripción del producto
              </h1>
              <input
                id='description'
                value={newProduct.description}
                onChange={handleChange}
                className='h-[100px] w-full rounded-md border-2 border-fourtiary  px-2'
                placeholder='Breve descripción del producto'
              />

              <h1 className='self-start text-lg text-gray-400'>
                Ubicación del Producto
              </h1>
              <select
                id='rack'
                value={newProduct.rack._id}
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary bg-white  px-2'
              >
                <option value=''>Seleccionar Ubicación</option>
                {racks.map((rack) => (
                  <option className='text-lg' key={rack._id} value={rack._id}>
                    {rack.name}
                  </option>
                ))}
              </select>

              <h1 className='self-start text-lg text-gray-400'>
                Fecha de Recepción
              </h1>
              <input
                id='receptionDate'
                value={newProduct.receptionDate}
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='date'
              />
              <h1 className='self-start text-lg text-gray-400'>
                Kilogramos Recepcionados
              </h1>
              <input
                id='weight'
                value={newProduct.weight}
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='number'
              />
              <h1 className='self-start text-lg text-gray-400'>
                Precio por Kilogramo (Bs.)
              </h1>
              <input
                id='price'
                value={newProduct.price}
                onChange={handleChange}
                className='h-[50px] w-full rounded-md border-2 border-fourtiary  px-2'
                type='number'
              />

              {query.id ? (
                <div className='flex items-center justify-between'>
                  <label className='relative inline-flex cursor-pointer items-center'>
                    <input
                      type='checkbox'
                      className='peer sr-only'
                      id='status'
                      value={newProduct.status}
                      checked={newProduct.status === 1}
                      onChange={handleStatusChange}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className='ml-3 text-sm font-medium text-gray-900'>
                      {newProduct.status === 1 ? 'Disponible' : 'No disponible'}
                    </span>
                  </label>
                </div>
              ) : null}
              {query.id ? (
                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                    Logo
                  </label>
                  <input
                    type='file'
                    id='photos'
                    accept='image/*'
                    onChange={(e) => {
                      if (e.target.files) {
                        const filesArray = Array.from(e.target.files);
                        setSelectedImages((prevImages) => [
                          ...prevImages,
                          ...filesArray,
                        ]);
                      }
                    }}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                    max='5145728' // 5MB en bytes
                  />
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className='relative mr-2 mb-2 inline-block w-full'
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.toString()}
                        className='h-30 w-full rounded-lg shadow-md'
                        height={100}
                        width={100}
                      />
                      <button
                        className='absolute top-0 right-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white text-xs font-bold text-red-500 focus:outline-none'
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {productImages.length > 0 ? (
                    <div>
                      <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                        Imágenes existentes
                      </label>
                      <div className='flex flex-wrap'>
                        {productImages.map((image, index) => (
                          <div
                            key={index}
                            className='relative mr-2 mb-2 inline-block w-full'
                          >
                            <img
                              src={image}
                              alt={image}
                              className='h-30 w-full rounded-lg shadow-md'
                              height={100}
                              width={100}
                            />
                            <button
                              className='absolute top-0 right-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 text-xs font-bold text-white focus:outline-none'
                              onClick={() => handleRemoveImageS3(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className='flex justify-center'>
                <button
                  type='submit'
                  disabled={loading}
                  className={`rounded-full ${
                    !loading ? 'bg-secondary py-2 px-4 text-white' : ''
                  }`}
                >
                  {loading ? (
                    <LoadingSpinner />
                  ) : query.id ? (
                    'Editar Producto'
                  ) : (
                    'Crear Producto'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterProduct;
