import React from 'react'

const Mensajes = ({children,tipo}) => {
  return (
       //pasamos el tipo de error con la variable tipo 
      
     <div className={` alerta ${tipo}`}>
       {children}
   </div>
  )
}

export default Mensajes
