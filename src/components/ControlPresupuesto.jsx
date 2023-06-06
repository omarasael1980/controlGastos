
import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {formatearCantidad} from '../helpers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
   useEffect(() => {
    //calculo de porcentaje para la grafica
  
    // el cero al final es porque el valor inicial gastado debe ser cero y se le ira aumentando
    // la cantidad gastada. reduce se aplica a un [] en este caso vera el total al sumar cada gasto
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        setGastado(totalGastado)
        //calculo de disponible
        setDisponible (presupuesto-totalGastado)
        //setear porcentaje
        const nuevoPorcentaje =((((presupuesto-(presupuesto-totalGastado))/presupuesto)*100).toFixed(2))
        setTimeout(() => {
          
            setPorcentaje(nuevoPorcentaje)
       
        }, 2000);
        
   },[gastos])
   const MySwal = withReactContent(Swal)
   const handleResetApp=() => {
    MySwal.fire({
      title: 'Deseas reiniciar la app? \n Todos los datos se borrarán',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Reiniciando!', '', 'success')
        setGastos ([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
        
      } else if (result.isDenied) {
        Swal.fire('Sin cambios', '', 'info')
      }
    })
   }
     
   
   
   
 
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
           

            <CircularProgressbar 
            value={porcentaje} 
            text={`${porcentaje}% Gastado` }
            styles={buildStyles({
                // Colors
                pathColor: porcentaje >100 ? `#DC2626` :  `#3B82F6`,
                textColor: porcentaje >100 ? `#DC2626` :'#3B82F6',
                trailColor: '#F5F5F5',
                
              })}
            />
      </div>
      <div className="contenido-presupuesto">
        <button 
        className='reset-app'
        type="button"
        onClick={handleResetApp}
        >Resetear App</button>
        
        <p>
            <span> Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p>
            <span> Cantidad Gastada:</span> {formatearCantidad(gastado)}
        </p>
        <p className={`${disponible <0 ? 'negativo' : ''}`}>
            <span> Disponible:</span> {formatearCantidad(disponible)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
