import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const MarcarConsulta = () => {

  const {vetId} = useParams();
  const {data} = useContext(AppContext);

  const [vetInfo, setVetInfo] = useState(null);

  const fetchVetInfo = () => {
    if (data && data[0] && data[0].veterinarios) {
      const vetInfo = data[0].veterinarios.find(vet => vet.id === String(vetId));
      setVetInfo(vetInfo);
    } else {
      console.warn('Os dados ainda não estão disponíveis.');
    }
  };
  

  useEffect(() => {
    if (data && data[0] && data[0].veterinarios) {
      fetchVetInfo();
    }
  }, [data, vetId]);
  

  return vetInfo && (
    <div>
    {vetInfo ? (
      <div className='marcar-container'>
        <div>
          <img src={vetInfo.image} alt={vetInfo.title} className='marcar-img'/>
        </div>
        <div className='marcar-info'>
          <h1>{vetInfo.title}</h1>
          <hr />
          <p>{vetInfo.especializacao}</p>
        </div>
      </div>
    ) : (
      <p>Carregando informações do veterinário...</p>
    )}
  </div>
  )
}

export default MarcarConsulta