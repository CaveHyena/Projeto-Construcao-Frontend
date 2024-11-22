import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Veterinarios = () => {
  const {data} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <section className='gatos' id='gatos'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">VETERINARIOS</h1>
                <p>Cada um dos nossos gatos tem sua própria personalidade, mas todos estão prontos para encontrar um lar cheio de amor. Seja tímido ou aventureiro, cada um traz alegria de um jeito único!</p>
            </div>
            <div className="gatos_container">
                {
                  data[0].veterinarios.map(element => (
                    <div className="card" key={element.id} onClick={()=>navigate(`/marcar-visita/${element.id}`)}>
                      <img src={element.image} alt={element.title} />
                      <h3>{element.title}</h3>
                      <button>{element.especializacao}</button>
                    </div>
                  ))
                }
                <button onClick={()=>{navigate(`/veterinarios`); scrollTo(0,0)}}>Ver mais</button> 
            </div>
        </div>
      </section>
    </>
  )
}

export default Veterinarios
