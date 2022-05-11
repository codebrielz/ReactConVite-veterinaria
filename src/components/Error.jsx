import React from "react";

//otra manera de pasar props es mediante la palabra reservada (de React) llamada children que hace referencia a todo lo que le pases a un componente, en esta variable se almacenará todo lo que le pases al componente, una funcion, codigo HTML...
export const Error = ({children}) => {
  return (
    <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded">
      {children}
    </div>
  );
};
