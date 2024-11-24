import React from "react";
import { data } from "../restApi.json";
const Time = () => {
  return (
    <section className="time" id="time">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">NOSSO TIME</h1>
<p>
    Cada membro contribui com suas habilidades para desenvolver uma experiência de usuário funcional, 
    garantindo a integração eficiente de componentes e o cumprimento dos requisitos da Construção de Frontend.
          </p>
        </div>
        <div className="time_container">
          {data[0].time.map((element) => {
            return (
              <div className="card" key={element.id}>
                <img src={element.image} alt={element.name} />
                <h3>{element.name}</h3>
                <p>{element.designation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Time;
