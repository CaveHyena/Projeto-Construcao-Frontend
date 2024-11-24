import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { usuario } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState(null); // Estado para armazenar dados do usuário
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    if (!usuario?.email) {
      // Se não há email do usuário, apenas retorna
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get(`/usuarios/email/${usuario.email}`);
        setCurrentUser(response.data); // Armazena os dados do usuário
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados do usuário");
      } finally {
        setIsLoading(false); // Atualiza o carregamento para false
      }
    };

    fetchUserData();
  }, [usuario]); // Depende apenas do usuário, para que o efeito seja acionado uma vez

  return { currentUser, isLoading, error };
};

export default useUser;
