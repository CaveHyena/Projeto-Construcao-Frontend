import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';

const Consultas = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const [consultas, setConsultas] = useState([]);
  useEffect(() => {
    const fetchConsultas = async () => {
      const response = await axiosFetch.get('/consultas');
      setConsultas(response.data);
    };
    fetchConsultas();
  }, []);

  return (
    <>
      <section className='gatos' id='gatos'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">CONSULTAS VETERINÁRIAS</h1>
                <p>Cuidados Veterinários Personalizados para Seu Pet</p>
            </div>
            <div className="gatos_container">
                {
                  consultas.slice(0,8).map(element => (
                    <div className="card" key={element._id} onClick={()=>navigate(`/visita/${element._id}`)}>
                      <img src={element.imagem} alt={element.titulo} />
                      <h3>{element.titulo}</h3>
                      <button>R$ {element.preco}</button>
                    </div>
                  ))
                }
            </div>
        </div>
      </section>
    </>
  )
}

export default Consultas
