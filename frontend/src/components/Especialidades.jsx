import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Especialidades = () => {

  const {data} = useContext(AppContext);

  return (
    <>
        <section className='qualities' id='qualities'>
          <div className="container">
                {
                  data[0].veterinariosEspecialidades.map(element => (
                    <div className="card" key={element.id}>
                      <Link onClick={()=>scrollTo(0,0)} to={`/marcar-visita/vet${element.id}`}>
                        <img src={element.image} alt={element.title} />
                        <p className='title'>{element.title}</p>
                        <p className='description'>{element.description}</p>
                      </Link>
                    </div>
                  ))
                }   
            </div>
        </section>
    </>
  )
}

export default Especialidades
