import React,{useState, useEffect} from 'react'
import { Error } from './Error';



export const Formulario = ({pacientes,setPacientes, editarPaciente}) => {  
  /**
   * Reglas de los hooks:
   * Los hooks se deben de colocar en la parte superior de tus componentes de React
   * No se deben de colocar dentro de condicionales y tampoco despues de un return
   */
  const [datos, setDatos] = useState({
    nombreMascota:'',
    nombrePropietario:'',
    email:'',
    alta:'',
    sintomas:'',
  });
  
  const [error, setError] = useState(false);

   /* 
  useEffect es un cb, se ejecuta cuando un state cambia o el componente esta listo.
  Al ejecutarse automaticamente cuando el componente esta listo, es un excelente lugar para colocar código para consultar una API o LocalStorage
  Debido a que le podemos pasar una dependencia y estar escuchando por los cambios que sucedan en una variable, puede actualizar el componente cuadno ese cambio suceda
  */
  useEffect(() => {
    //Object.keys(editarPaciente).length es para comprobar si el objeto contiene o no propiedades
    //Si editarPaciente es mayor a cero (es decir, si tiene 1 propiedad o elemento)
    if(Object.keys(editarPaciente).length > 0){
      //Si editarPaciente contiene propiedades significa que le hemos dado al boton de editar, por ende, llamamos al metodo setDatos y le pasamos el objeto editarPaciente y setDatos se encargará de escribir la informacion a editar en sus respectivos inputs
      setDatos(editarPaciente);
    }else{ //si no
      console.log("No hay nada"); //esto
    }; 
  }, [editarPaciente])

  const generarId = () => {
    //Math.random().toString(36).substring(2) <-- esto genera un número aleatorio(Math.random()) de tipo string y a su vez genera strings aleatorios(toString(36)) a partir de la posicion dos (substring) 
       //el 36 es de base 36: El sistema numérico en base 36 se llama sistema alfanumérico y utiliza para su representación los símbolos 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }


  //Obtenemos mediante desestructuracion los atributos de datos para poder hacer validaciones, y colocarlos como value en cada uno de los inputs para así poder indicar el valor de cada input mediante atributos del useState
  const {nombreMascota,nombrePropietario,email,alta,sintomas} = datos;

  //desestructuramos el objeto de nuestro state datos
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    // y mediante corchetes como si tratara de un array colocamos todos los atributos desestructurados del state datos y confirmamos si los campos incluyen un string vacio o con informacion
    if( [nombreMascota,nombrePropietario,email,alta,sintomas].includes('')){
      setError(true);
      return; //Con este return lo que conseguimos es que una vez entre en esta validacion, salga de la funcion por completo sin seguir hacia abajo
    }

    setError(false);

    //Generamos un arreglo con el anterior estado del objeto pacientes y el actual del objeto datos pasandolo a setPacientes y así mismo registrandolo en el objeto pacientes.
    setPacientes([...pacientes, datos]);
    //Reiniciar el form
    setDatos({
      nombreMascota:'',
      nombrePropietario:'',
      email:'',
      alta:'',
      sintomas:'',
    });
  }

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      id: generarId(),
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y
        <span className='text-indigo-600 font-bold'> Administralos</span>
      </p>
      <form action="" className='bg-white shadow-md rounded-lg py-10 px-5' onSubmit={handleSubmit}>
        {
          error && (
            // Al utilizar children cambia la sintaxis de nuestra forma de enviar los props, comunmente se haría así:
        //  <Error mensaje="Todos los campos son obligatorios"/>, la ventaja de utilizar children es que puedes agregarle más patrones si fuera necesario
        // Pero al utilizar children la sintaxis es la siguiente:
        <Error><h1>Mensaje de error:</h1><p>Todos los campos son obligatorios</p></Error>
          )
        }
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
        
          <input 
          id="mascota"
          type="text" 
          placeholder='Nombre de la mascota' 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          name="nombreMascota"
          value={nombreMascota}
          onChange={handleInputChange}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
        
          <input id="propietario" type="text" placeholder='Nombre del propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' name="nombrePropietario" value={nombrePropietario} onChange={handleInputChange}/>
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email</label>
        
          <input id="email" type="email" placeholder='Email' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' name="email" value={email} onChange={handleInputChange}/>
        </div>
        <div className='mb-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>Alta</label>
        
          <input id="alta" type="date" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' name="alta" value={alta}  onChange={handleInputChange}/>
        </div>
        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea id="sintomas" placeholder="Describe los sintomas" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={sintomas} name="sintomas" onChange={handleInputChange}/>
        </div>
        <input type="submit" className={editarPaciente.id ? 'bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors':'bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'} value={editarPaciente.id ?"Editar Paciente":"Agregar Paciente"} />
      </form>
    </div>
  )
}
