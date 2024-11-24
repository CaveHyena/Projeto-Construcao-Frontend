import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';

const VeterinariosPopulares = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const axiosFetch = useAxiosFetch();
  useEffect(() => {
    axiosFetch.get('/agendamento/veterinarios-populares').then((data) => {
      setVeterinarios(data.data)
    }).catch((err) => {console.log(err)})
  }, []);

  return (
    <>
      {Array.isArray(veterinarios) && veterinarios.length > 0 ? (
        <section className="qualities" id="qualities">
          <h2>TOP 3 - VETERINÁRIOS</h2>
          <div className="container">
            {veterinarios.map((element) => (
              <div className="card" key={element.veterinario._id}>
                <Link onClick={() => window.scrollTo(0, 0)} to={`/veterinarios`}>
                  <img src={element.veterinario.fotoUrl} alt={element.nome} />
                  <p className="title">{element.veterinario.nome}</p>
                  <p className='contagem'>{element.totalMarcado}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="no-data">Nenhum veterinário encontrado no momento.</p>
      )}
    </>
  );
}; 

export default VeterinariosPopulares
