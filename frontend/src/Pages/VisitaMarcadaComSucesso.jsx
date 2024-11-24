import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MarcadoComSucesso = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCountdown((preCount) => {
        if (preCount === 1) {
          clearInterval(timeoutId);
          navigate("/");
        }
        return preCount - 1;
      });
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [navigate]);

  return (
    <>
      <section className="PaginaNaoEncontrada">
        <div className="container">
          <img src="/sucesso.png" alt="Consulta marcada com sucesso" />
          <h1>CONSULTA MARCADA!</h1>
          <p>Redirecionando para a PaginaInicial em {countdown} segundos...</p>
          <Link to={"/"}>
            Voltar para PaginaInicial
          </Link>
        </div>
      </section>
    </>
  );
};

export default MarcadoComSucesso;