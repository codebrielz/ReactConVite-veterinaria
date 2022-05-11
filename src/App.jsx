import React, { useState } from "react";
import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";
import { ListadoPacientes } from "./components/ListadoPacientes";

// JSX: JavaScript Syntax Extension, es una extension del lenguaje desarrollada por Meta para React
// basicamente es un lenguaje de Template que muestra el HTML pero tiene todas las funciones de JavaScript
/* Reglas en JSX.
 * Cada componente debe de tener un return
 * Lo más importante es que en cada componente creado con return, debe de devolver 1 solo elemento en el nivel más alto
 */

//Los props son una forma de pasar variables o funciones de un componente a otro
/**
 * Qué son los props?
 * El state o Funciones que creas en tus componentes, solo estarán disponible en ese componente, y para pasarlos se utilizan los props.
 * Una forma de evitar duplicar código y reutilizar esas variables, state o estado y funciones en otros componentes es por medio de Props.
 * Los props se pasan del padre al hijo, no a la inversa.
 * Si tenemos un state que va a pasar por diferentes componentes, lo mejor es colocarlo en el archivo principal.
 * Cada nivel de componentes deberá tomar y pasar el Prop hacia otros componentes, tecnologías como Redux o Context evitan tener que hacerlo de esta forma
 * Las funciones enviadas desde el padre al hijo, el hijo puede retornar una respuesta y recibirla el padre.
 */
export const App = () => {
  const [pacientes, setPacientes] = useState([]);
  const [editarPaciente, setEditarPaciente] = useState({});

  return (
    <div className="container mx-auto mt-6">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          editarPaciente={editarPaciente}
         />
        <ListadoPacientes 
        pacientes={pacientes}
        setEditarPaciente={setEditarPaciente}
        />
      </div>
    </div>
  );
};
