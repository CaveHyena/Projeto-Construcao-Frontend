import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/send",
        { firstName, lastName, phone, date, time },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);  // Mensagem de sucesso se a resposta for recebida
      setFirstName("");
      setLastName("");
      setPhone("");
      setTime("");
      setDate("");
      navigate("/success");
    } catch (error) {
      // Verifique se o erro possui resposta
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MARQUE UM HORÁRIO</h1>
            <p>
              Ou se preferir, nos chame no <a href="https://wa.me/55982566294?text=Olá!%20Gostaria%20de%20saber%20mais%20informações." target="_blank">
  WhatsApp. <FaWhatsapp />
</a>
            </p>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                <PhoneInput
                  placeholder="N° de celular"
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="BR" 
                />
              </div>
              <button type="submit" onClick={handleReservation}>
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

export default Reservation;
