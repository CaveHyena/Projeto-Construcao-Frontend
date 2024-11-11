import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">SOBRE NÓS</h1>
              <p>Todos nossos gatos são de rua, em sua maioria já adultos,</p>
            </div>
            <p className="mid">
              Sem a intenção inicial de nos tornarmos um "abrigo informal de animais", nossa casa foi se enchendo de novos moradores — 
              fossem gatos que acolhíamos após encontrá-los abandonados na rua, ou aqueles que acabavam sendo deixados dentro do nosso muro. 
              Cuidar de tantos animais tem sido um desafio, e, com as despesas cada vez mais altas, decidimos criar este site na 
              esperança de atrair pessoas interessadas em adotar um de nossos bichanos. 
            </p>
            <p>
              Mais do que aliviar um pouco nosso fardo, 
              queremos que cada um desses gatos encontre alguém que possa dar a devida atenção que eles merecem.
            </p>
            <Link to={"/"}>
              Explore Gatos{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
