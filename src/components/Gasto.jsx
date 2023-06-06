import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem, 
    SwipeAction, 
    TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from '../helpers'
import {formatearCantidad} from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/Icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'





const diccionarioIconos ={
    ahorro: IconoAhorro,
    casa: IconoCasa,
    comida:IconoComida ,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({gasto,setGastoEditar,gastosEliminar}) => {
    const {categoria, nombre, cantidad, id, fecha} = gasto
    //EFECTOS DE MOvimiento a la derecha o izquierda
    //cambiar las {} por () en la funcion significa return para mandar componentes
    const leadingActions = () =>(
            <LeadingActions>
                <SwipeAction 
                onClick={()=> setGastoEditar(gasto)}
               
                >
                    Editar
                </SwipeAction>
            </LeadingActions>
    )
    const trailingActions = () =>(
        <TrailingActions>
            <SwipeAction 
            onClick={()=> gastosEliminar(id)}
            destructive={true}
            >
                Eliminar

            </SwipeAction>
        </TrailingActions>
        
    )
  return (
    <SwipeableList>
        <SwipeableListItem 
            //se le pasan los props para el comportamiento ver libreria
            //leading a la derecha trailingAction izquierda
            leadingActions = {leadingActions()}
            trailingActions = {trailingActions()}
        >
            <div className='gasto sombra'>
                <div className="contenido-gasto">
                    <img 
                    src={diccionarioIconos[categoria]} 
                    alt="Icono Gasto" />
                    <div className="descripcion-gasto">
                        <p className='categoria'>  {categoria}</p>
                        <p className='nombre-gasto'>{nombre}</p>
                        <p className='fecha-gasto'>Agregado el:
                            <span>{formatearFecha(fecha)}</span>
                        </p>
                    
                    </div>
            
                 </div>
                    <p className="cantidad-gasto">{formatearCantidad(cantidad)}</p>
            </div>
        </SwipeableListItem>

    </SwipeableList>
  )
}

export default Gasto
