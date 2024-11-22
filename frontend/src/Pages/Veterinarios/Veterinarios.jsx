import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const Veterinarios = () => {

  const {data} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='Filtro-container'>
      <div className='Filtro'>
        <div className='gatos_containerFiltro'>
          {
            data[0].veterinarios.map(element => (
              <div className="cardFiltro" key={element.id} onClick={()=>{navigate(`/marcar-visita/${element.id}`); scrollTo(0,0)}}>
                <img src={element.image} alt={element.title} />
                <h3>{element.title}</h3>
                <button>{element.especializacao}</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Veterinarios