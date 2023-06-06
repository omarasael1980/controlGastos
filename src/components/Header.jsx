import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
      gastos, 
      setGastos,
      presupuesto,
      setPresupuesto,
      isValidPresupuesto, 
      setIsValidPresupuesto }) => {

  return (
    <header>
      <h1>
        Planificador de gastos
      </h1>
      { isValidPresupuesto ? (
     <ControlPresupuesto 
     gastos={gastos}
     setGastos = {setGastos}
     presupuesto={presupuesto}
     setPresupuesto={setPresupuesto}
     setIsValidPresupuesto={setIsValidPresupuesto}
     
    
     />
    ) : (
      // si la cantidad es valida entonces se pasa el presuesto
      <NuevoPresupuesto
      presupuesto ={presupuesto}
      setPresupuesto ={setPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      
    ) }
     
    </header>
  
  )
}

export default Header
