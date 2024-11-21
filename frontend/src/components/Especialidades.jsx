import React from 'react'
import {data} from '../restApi.json'
import { Link } from 'react-router-dom'
const Especialidades = () => {
  return (
    <>
        <section className='qualities' id='qualities'>
          <div className="container">
                {
                  data[0].veterinariosEspecialidades.map(element => (
                    <div className="card">
                      <Link onClick={()=>scrollTo(0,0)} key={element.id} to={`/veterinario/${element.title}`}>
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
