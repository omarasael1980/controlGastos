import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
    gastos,
    setGastoEditar, 
    gastosEliminar,
    filtro,
    gastosFiltrados
    }) => {
  
  return (
    <div className='listado-gastos contenedor'>
     
     {/* Se muestran los datos si se selecciona el filtro */}
    {
        filtro ? (
            <>     
                    <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}
                    </h2>
                   { gastosFiltrados.map( gasto =>(
                     // gastos filtrados
                    <Gasto 
                    key = {gasto.id}
                    gasto = {gasto}
                    setGastoEditar={setGastoEditar}
                    gastosEliminar={gastosEliminar}
                     />
                 ))}
          </>) : (
            <>
                 <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}
                 </h2>
                {gastos.map( gasto =>(
                    // gastos totalas
                    <Gasto 
                    key = {gasto.id}
                    gasto = {gasto}
                    setGastoEditar={setGastoEditar}
                    gastosEliminar={gastosEliminar}
                    />
                 ))}
          </>
          )
         
    }
    
   
    </div>
  )
}

export default ListadoGastos
