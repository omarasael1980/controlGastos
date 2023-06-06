import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import {generaId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'





function App() {
 //hook para gastos
const [gastos, setGastos] = useState(

  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) :[]
)
//hook para presupuesto
const [presupuesto, setPresupuesto]=useState(
  localStorage.getItem('presupuesto') ?? 0
)
//hook para validar si el presupuesto es numero mayor a cero
const [isValidPresupuesto, setIsValidPresupuesto]=useState(false)
//hook para que aparezca modal
const [modal, setModal] = useState(false)
// hook para que aparezca formulario
const [animarModal, setAnimarModal] = useState(false)
//hook para editar gasto
const [gastoEditar, setGastoEditar] = useState({})
//use state para filtro
const [filtro, setFiltro] = useState('')
 //use state para mostrar resultados del filtro
const [gastosFiltrados, setGastosFiltrados] = useState([])
useEffect(() =>{
  if(Object.keys(gastoEditar).length >0){
    handleNuevoGasto();
    
  }
  
}, [gastoEditar])

//useEffect para localStorage
useEffect(() =>{
    Number(localStorage.setItem('presupuesto',presupuesto ?? 0))
},[presupuesto])
//useEffect para gastos
useEffect(() =>{
  Number(localStorage.setItem('gastos',JSON.stringify(gastos) ?? []))
},[gastos])
//localStorage para presupuesto
useEffect(()=>{
  const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0
  if(presupuestoLS>0){
    setIsValidPresupuesto(true)
  }
},[])
//LocalStorage para gastos
useEffect(()=>{
  const gastosLS = Number(localStorage.getItem("gastos")) ?? 0
  if(gastosLS>0){
    setIsValidPresupuesto(true)
  }
},[])
//filtrando
useEffect(()=>{
  //actualizar o filtrar datos por categoria
  if(filtro){
    const gastosFiltrados = gastos.filter(gasto=>gasto.categoria === filtro)
     //pasar los gastos filtrados al arreglo gastos
     setGastosFiltrados(gastosFiltrados)
  }
},[filtro])
//activar el modal de nuevo gasto 
const handleNuevoGasto = ()=>{
  //nuevo gasto
  setModal (true)
  setTimeout(() => {
   setAnimarModal(true)
   
}, 500);
//editar gastos
}
//funcion para guardar gasto
const guardarGasto = gasto => {
  //se revisa si es nuevo o edicion
  if(gasto.id ){
    //edicion
    const gastosActualizados = gastos.map(gastoState => gastoState.id ===
      gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
  }else{
    //nuevo registro de gasto
     //se agrega un id unico con la funcion en helpers llamada generarID 
    gasto.id = generaId()
    //se guarda fecha de registro
    gasto.fecha = Date.now()
    setGastos([...gastos,gasto])
    
  }
 

  setAnimarModal(false)
  setTimeout(() => {
    setModal (false)
}, 500);
}
//metodo para eliminar gastos
const gastosEliminar = id => {
const gastosActualizados = gastos.filter(gasto=>gasto.id !== id)
  setGastos(gastosActualizados)


}
  return (
    // cuando el modal este activo se pone la clase fijar
    //esto apra evitar que se quede abajo la pantalla

     <div className={modal ? "fijar":""}>
      {/* se agrega componente de header */}
      <Header 
      gastos = {gastos}
      setGastos = {setGastos}
      presupuesto ={presupuesto}
      setPresupuesto ={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
     
     

      />
        {/* Si && solo se aplica el positivo no el negativo */}
      {isValidPresupuesto &&(
        <>
            <main >
              <Filtros
              filtro = {filtro}
              setFiltro = {setFiltro}
              />
              <ListadoGastos
              gastos = {gastos}
              setGastoEditar={setGastoEditar}
              gastosEliminar ={gastosEliminar}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
              />
            </main>
            <div className='nuevo-gasto'>
                <img 
                src={IconoNuevoGasto} 
                alt="nuevo gasto" 
                onClick={handleNuevoGasto}/>

        </div>
          </>
      )}
     {modal && <Modal
                 setModal={setModal}
                 animarModal={animarModal}
                 setAnimarModal={setAnimarModal}
                 guardarGasto = {guardarGasto}
                 gastoEditar={gastoEditar}
                 setGastoEditar = {setGastoEditar}
                
                 />}
     </div>
    
  )
}

export default App
