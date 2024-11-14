import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const Sucesso = () => {
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
          <img src="/sucesso.png" alt="sucesso" />
          <h1>ENCONTRO MARCADO!</h1>
          <p>Redirecionando para Menu em {countdown} segundos...</p>
          <Link to={"/"}>
            Voltar para Menu <HiOutlineArrowNarrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Sucesso;