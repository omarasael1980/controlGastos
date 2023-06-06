import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <div className="campo">
                <label htmlFor="">Filtrar Gastos</label>
                <select     
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                >
                                <option value="">---    Todas las Categorias   ----</option>
                                <option value="ahorro">Ahorro</option>
                                <option value="casa">Casa</option>
                                <option value="comida">Comida</option>
                                <option value="gastos">Gastos Varios</option>
                                <option value="ocio">Entretenimiento</option>
                                <option value="salud">Salud</option>
                                <option value="suscripciones">Suscripciones</option>
                </select>
        </div>
      
    </div>
  )
}

export default Filtros
