export const generaId = ()=>{
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random+fecha
}

export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha)
    
    const opciones  ={
          year: 'numeric',
          month:'long',
          day:'2-digit'
      }
  
  
    return fechaNueva.toLocaleDateString('es-ES',opciones)
}
export const formatearCantidad = (cantidad) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    return formatter.format(cantidad)
}