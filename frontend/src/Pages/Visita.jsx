import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useUser from '../hooks/useUser';

const Visita = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useUser();

  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const response = await axiosFetch.get(`/consultas/exibir/${id}`);
        setConsulta(response.data);
      } catch (error) {
        toast.error("Erro ao carregar informações da consulta.");
      }
    };

    if (id) fetchConsulta();
  }, [id]);

  const handleMarcarConsulta = async () => {
    if (!currentUser) {
      toast.error("Faça login antes de marcar uma consulta.");
      navigate('/login');
      return;
    }

    if (["admin", "veterinario"].includes(currentUser.cargo)) {
      toast.error("Você não tem permissão para marcar consultas.");
      return;
    }

    try {
      // VERIFICAR SE JÁ ESTÁ NA LISTA
      const responseVerificacao = await axiosSecure.get(
        `/minha-lista/exibir/${id}?email=${currentUser.email}`
      );

      if (responseVerificacao.data?.consultaId === id) {
        toast.error("Esta consulta já está na sua lista.");
        return;
      }

      // ADICIONAR CONSULTA À LISTA
      const data = {
        consultaId: id,
        email: currentUser.email,
        data: new Date(),
      };

      await toast.promise(
        axiosSecure.post("/minha-lista/adicionar", data),
        {
          pending: "Adicionando consulta...",
          success: "Consulta adicionada com sucesso!",
          error: "Erro ao adicionar consulta.",
        }
      );

      // REDIRECIONAR PARA A PÁGINA DE SUCESSO
      navigate('/marcada-com-sucesso');
    } catch (error) {
      toast.error("Erro ao marcar a consulta.");
    }
  };

  if (!consulta) return <p>Carregando informações...</p>;

  return (
    <div className="marcar-container">
      <div>
        <img src={consulta.imagem} alt={consulta.titulo} className="marcar-img" />
      </div>
      <div className="marcar-info">
        <h1>{consulta.titulo}</h1>
        <p>{consulta.descricao}</p>
        <p>Preço: R$ {consulta.preco?.toFixed(2)}</p>
        <button 
          onClick={handleMarcarConsulta} 
          disabled={["admin", "veterinario"].includes(currentUser?.cargo)}
        >
          Marcar Consulta
        </button>
      </div>
    </div>
  );
};

export default Visita;
