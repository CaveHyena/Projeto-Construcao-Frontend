import React from 'react';
import {data} from '../restApi.json';
import { useNavigate } from 'react-router-dom';

const Gatos = () => {

  const navigate = useNavigate();

  return (
    <>
      <section className='gatos' id='gatos'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">NOSSOS GATOS</h1>
                <p>Cada um dos nossos gatos tem sua própria personalidade, mas todos estão prontos para encontrar um lar cheio de amor. Seja tímido ou aventureiro, cada um traz alegria de um jeito único!</p>
            </div>
            <div className="gatos_container" id='gatos'>
                {
                  data[0].gatos.slice(0,8).map(element => (
                    <div className="card" key={element.id} onClick={()=>navigate(`/gatos/visita/${element.id}`)}>
                      <img src={element.image} alt={element.title} />
                      <h3>{element.title}</h3>
                      <button>{element.caracteristica}</button>
                    </div>
                  ))
                }
                <button onClick={()=>{navigate(`/gatos`); scrollTo(0,0)}}>Ver mais</button>
            </div>
        </div>
      </section>
    </>
  )
}

export default Gatos
