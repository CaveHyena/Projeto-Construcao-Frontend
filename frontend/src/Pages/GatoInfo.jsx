import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const GatoInfo = () => {
  const { id } = useParams();
  const { data } = useContext(AppContext);

  if (!data || !data[0]?.gatos) {
    return <p>Carregando dados ou dados não disponíveis.</p>;
  }

  const gato = data[0].gatos.find(gato => gato.id === id);

  if (!gato) {
    return <p>Gato não encontrado.</p>;
  }

  return (
    <section className='gato-detelhes-section'>
      <div className="gato-detalhes-container">
        <img className="gato-detalhes-imagem" src={gato.image} alt={gato.title} />
        <div className="gato-detalhes-info">
          <h1>{gato.title}</h1>
          <p><strong>Descrição:</strong> {gato.caracteristica}</p>
          <h2>Informações do Abrigo</h2>
          <p><strong>Nome do Abrigo:</strong> {gato.abrigo.nome}</p>
          <p><strong>Endereço:</strong> {gato.abrigo.endereco}</p>
          <p><strong>Contato:</strong></p>
          <ul>
            <li><strong>Celular:</strong> {gato.abrigo.contato.celular}</li>
            <li><strong>Email:</strong> {gato.abrigo.contato.email}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GatoInfo