import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  return (
    <div className="flex flex-row min-h-screen h-full">
      <div className="w-[50vw] bg-secondary px-10 py-4">
        <h1 className="text-white text-xl font-bold">Logo</h1>
      </div>
      <div className="w-[50vw]  px-10 py-4 ">
        <Link href="/" className="flex flex-row gap-2 items-center self-center">
          <FaArrowLeft className="text-lg text-gray-400" />
          <p className="font-semibold text-gray-400">Atras</p>
        </Link>
        <div className="h-[99%] m-auto flex flex-col justify-center items-center  w-3/4">
          <div className="flex flex-col justify-center w-full items-center gap-5 ">
            <h1 className="text-3xl -bold self-start">Registro Cajero</h1>
            <h1 className="text-lg self-start text-gray-400">
              Nombre Completo
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="text"
              placeholder="Introducir su nombre completo"
            />
            <h1 className="text-lg self-start text-gray-400">
              Usuario (Correo)
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="text"
              placeholder="ejemplo@gmail.com"
            />
            <h1 className="text-lg self-start text-gray-400">Genero</h1>
            <select className="w-full h-[50px] bg-white px-2 border-2 border-fourtiary  rounded-md">
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <h1 className="text-lg self-start text-gray-400">
              Año de nacimiento
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="date"
            />
            <h1 className="text-lg self-start text-gray-400">
              Carnet de Identidad
            </h1>
            <input
              className="w-full h-[50px] px-2 border-2 border-fourtiary  rounded-md"
              type="text"
              placeholder="Introducir su carnet de identidad"
            />

            <button className="w-[300px] h-[50px] bg-primary text-white rounded-md">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
