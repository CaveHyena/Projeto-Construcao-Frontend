import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Cadastrar = () => {
  const [state, setState] = useState("Entrar")
  const [nome, setnome] = useState("");
  const [sobrenome, setsobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login/usuario/cadastrar",
        { nome, sobrenome, email, phone, date, time },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message); 
      setnome("");
      setsobrenome("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      navigate("/visita-marcada");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <section className="usuario">
      <div className="container">
        <div className="banner">
          <img className="cat" src="/form.png" alt="res" />
        </div>
        <div className="banner" id="usuario">
          <div className="usuario_form_box">
            <h1>{state === "Entrar" ? "Criar Conta" : "Login"}MARQUE UMA VISITA</h1>
            
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setnome(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={sobrenome}
                  onChange={(e) => setsobrenome(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Data"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Horário"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  title="Hora:Minuto"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="email_tag"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PhoneInput
                  placeholder="N° de celular"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="BR" 
                />
              </div>
              <button type="submit" onClick={cadastrar}>
                MARCAR VISITA{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cadastrar;
