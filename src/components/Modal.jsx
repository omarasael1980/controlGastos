import CerrarBtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react';
import Mensajes from './Mensajes';


const Modal = ({
    //props:
        setModal, 
        animarModal, 
        setAnimarModal, 
        guardarGasto, 
        gastoEditar,
        setGastoEditar
}) => {
    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState("")
    const [mensaje, setmensaje] = useState("")
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState("")
    //para cachar cualquier cambio de edicion
    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha (gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])
    const ocultarModal =()=>{
        
        setAnimarModal(false);
           //vaciar el state 
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);
         }, 500);
    }
    const handleSubmit = (e)=>{
            e.preventDefault();
            //validar que todos los campos sean obligatorios
            if([nombre, cantidad, categoria].includes('')){
                setmensaje("Todos los campos son obligatorios")
                setTimeout(() => {
                   setmensaje("")
                }, 3000);
                return;
            }
            guardarGasto({nombre, cantidad, categoria,fecha, id})
    }
  return (
    
    <div className="modal">
        <div className="cerrar-modal">
                    <img 
                        src={CerrarBtn}
                        alt="cerrar modal"  
                        onClick={ocultarModal}
                     />
        </div>
        <form 
        onSubmit={handleSubmit}
         className={`formulario ${animarModal ? "animar" : 'cerrar'}`
        }>
           <legend>{ gastoEditar.nombre ? 'Editar Gasto': 'Nuevo Gasto'}</legend>
           {mensaje && <Mensajes  tipo="error">{mensaje}</Mensajes> }
            
           <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    id="nombre"
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />
           </div>
           <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    id="cantidad"
                    type="number" 
                    placeholder='Escribe la cantidad del gasto'
                    value={cantidad}
                    onChange={(e)=>setCantidad(Number(e.target.value))}
                />
           </div>
           <div className='campo'>
                <label htmlFor="cantidad">Categoría del gasto</label>
               <select 
                    name="categoria" 
                    id="categoria"
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                    >
                    <option value="0">--Selecciona--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Casa</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Entretenimiento</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                 
  
               </select>
           </div>
           <input  
           
            type="submit" 
            value={ gastoEditar.nombre ? "Guardar cambio" : "Agregar Gasto" }/>
           
        </form>
    </div>
    
  )
}

export default Modal
