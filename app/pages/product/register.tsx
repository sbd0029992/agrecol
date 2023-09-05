import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  return (
    <div className="flex flex-row min-h-screen h-full">
      <div className="w-full px-10 self-center ">
        <div className="h-[99%] m-auto flex flex-col justify-center items-center  w-3/4">
          <div className="flex flex-col justify-center w-full items-center gap-3 ">
            <h1 className="text-3xl -bold self-start">Registrar Producto</h1>
            <h1 className="text-lg self-start text-gray-400">Nombre</h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="text"
              placeholder="Introducir su nombre completo"
            />
            <h1 className="text-lg self-start text-gray-400">
              Descripción del producto
            </h1>
            <textarea
              className="w-full h-[100px] px-2 border-2 border-fourtiary  rounded-md"
              placeholder="ejemplo@gmail.com"
            />
            <h1 className="text-lg self-start text-gray-400">
              Ubicacion del Producto
            </h1>
            <select className="w-full h-[50px] bg-white px-2 border-2 border-fourtiary  rounded-md">
              <option value="12">Estante 1</option>
              <option value="11">Estante 2</option>
            </select>
            <h1 className="text-lg self-start text-gray-400">
              Fecha de Recepcion
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="date"
            />

            <h1 className="text-lg self-start text-gray-400">
              Peso en Kilogramos
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="number"
            />
            <h1 className="text-lg self-start text-gray-400">
              Precio por Kilogramo
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="number"
            />
            <h1 className="text-lg self-start text-gray-400">
              Seleccionar Imagen
            </h1>
            <button className=" px-4 h-[50px] bg-primary text-white rounded-md self-start">
              Subir Imagen
            </button>
            <button className="px-8 h-[50px] bg-secondary text-white rounded-md">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
