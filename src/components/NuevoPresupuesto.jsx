import {useState} from 'react'
import Mensajes from './Mensajes'

const NuevoPresupuesto = ({presupuesto,
  setPresupuesto,
  setIsValidPresupuesto}) => {
   //useState para mensaje de error
   const [mensaje,setMensaje] =useState("")
  //se hace validacion para campo de presupuesto
  const handlePresupuesto = (e) => {
   

    e.preventDefault();
    
    if(! presupuesto || presupuesto <0) {
     
      setMensaje("No es una  cantidad válido")
      return
    }
    // si es un presupuesto valido
    setMensaje("")
    setIsValidPresupuesto (true)

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
     <form onSubmit={handlePresupuesto} className="formulario"action="">
        <div className='campo'>
            <label htmlFor="">Definir Presupuesto</label>
            <input 
            type="number" 
            className='nuevo-presupuesto'
            placeholder='Ingresa tu presupuesto'
            value={presupuesto}
            onChange={(e)=>setPresupuesto(e.target.value)}
            />
        </div>
        <input type="submit" value="Ingresar" />
        
        {mensaje && <Mensajes tipo="error">{mensaje}</Mensajes> }
     </form>
    </div>
  )
}

export default NuevoPresupuesto
