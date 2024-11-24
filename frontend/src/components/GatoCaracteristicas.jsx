import React from 'react'
import {data} from '../restApi.json'
const GatoCaracteristicas = () => {
  return (
    <>
        <section className='qualities' id='qualities'>
          <div className="container">
            {
              data[0].gatoCaracteristicas.map(element=>{
                return(
                  <div className='card' key={element.id}>
                      <img src={element.imagem} alt={element.titulo} />
                      <p className='title'>{element.titulo}</p>
                      <p className='description'>{element.descricao}</p>
                  </div>
                )
              })
            }
          </div>
        </section>
    </>
  )
}

export default GatoCaracteristicas
