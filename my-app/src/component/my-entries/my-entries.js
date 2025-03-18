import React from "react";

const MyEntries = () => {
  const entries = [
    { id: 1, title: "Entry 1", content: "Content of entry 1" },
    { id: 2, title: "Entry 2", content: "Content of entry 2" },
    // ...agregar más entradas según sea necesario...
  ];

  return (
    <div className="bg-gray-0 p-8 rounded-lg w-full max-w-2xl text-white">
      <h1 className="text-2xl font-bold mb-4">Mis Entradas</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-[rgb(0, 204, 153)] text-black border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Nombre de usuario"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Adulto        Asignar entrada"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Adulto        Asignar entrada"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Adulto        Asignar entrada"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Menor        Asignar entrada"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-700 text-white border-2 border-dashed border-[rgba(25, 119, 97, 0.85)]"
          placeholder="Menor        Asignar entrada"
        />
      </div>
    </div>
  );
};

export default MyEntries;
