import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';

const Veterinarios = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const [veterinarios, setVeterinarios] = useState([]);
  useEffect(() => {
    const fetchVeterinarios = async () => {
      const response = await axiosFetch.get('/veterinarios');
      setVeterinarios(response.data);
    };
    fetchVeterinarios();
  }, []);
  return (
    <>
      <section className='gatos' id='gatos'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">VETERINARIOS ASSOCIADOS</h1>
                <p>Conheça Nossos Veterinários Associados</p>
            </div>
            <div className='veterinario-info'>
                {
                  veterinarios.map(element => (
                    <div className='veterinariocontainer' key={element._id}>
                      <img className="imagem-veterinario" src={element.imagem} alt={element.nomeVeterinario} />
                      <h3>{element.nomeVeterinario}</h3>
                      <p>{element.descricao}</p>
                      <p>{element.especializacao}</p>
                      <p>{element.celularVeterinario}</p>
                      <p>{element.emailVeterinario}</p>
                    </div>
                  ))
                }
            </div>
        </div>
      </section>
    </>
  )
}

export default Veterinarios
