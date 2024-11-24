import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const PaginaNaoEncontrada = () => {
  return (
    <>
      <section className="PaginaNaoEncontrada">
        <div className="container">
          <img src="/PaginaNaoEncontrada.svg" alt="PaginaNaoEncontrada" />
          <h1>PÁGINA NÃO ENCONTRADA :/</h1>
          <p>Oops! Esta página não pode ser encontrada!</p>
          <Link to={"/"}>
            Retornar à PáginaInicial{" "}
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default PaginaNaoEncontrada;
