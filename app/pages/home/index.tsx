import Link from "next/link";
import React from "react";

function MyComponent() {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="background-registerProduct">
        <Link href="/" className="text-center flex flex-col gap-3">
          <h1>LISTA</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
      <div className="background-listProduct">
        <Link href="/" className="text-center flex flex-col gap-3 ">
          <h1>REGISTRO</h1>
          <h1>PRODUCTOS</h1>
        </Link>
      </div>
    </div>
  );
}

export default MyComponent;
