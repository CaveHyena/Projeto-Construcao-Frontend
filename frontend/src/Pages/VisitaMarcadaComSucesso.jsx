import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const MarcadoComSucesso = () => {
  const [countdown, setCountdown] = useState(20);
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
          <img src="/sucesso.png" alt="Visita marcada com sucesso" />
          <h1>VISITA MARCADA!</h1>
          <p>Redirecionando para a PaginaInicial em {countdown} segundos...</p>
          <Link to={"/"}>
            Voltar para PaginaInicial <HiOutlineArrowNarrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default MarcadoComSucesso;