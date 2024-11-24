import { useContext, useEffect } from "react";
import { AuthContext } from "../utilities/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:4000/", 
  });

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("[useAxiosSecure] Nenhum token encontrado no localStorage.");
      }

      return config;
    });

    // RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === 401 || status === 403) {
            console.warn("[useAxiosSecure] Token inválido ou expirado. Realizando logout...");
            await logout();
            navigate("/login");
          }
        } else {
          console.error("[useAxiosSecure] Erro sem resposta do servidor:", error.message);
        }

        throw error;
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
