import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="banner">
          <div className="left">GATOS.O.S.</div>
          <div className="right">
          <p>Se preferir, nos chame pelo</p>
          <p><a href="https://wa.me/55912345678?text=Olá!%20Gostaria%20de%20saber%20mais%20informações." target="_blank"> WhatsApp. <FaWhatsapp /></a></p>
          </div>
        </div>
        <div className="banner">
          <div className="left">
            <p>CODEWITHZEESHU - GreatStack - Md Al Mamun - Tahmid Ahmed</p>
          </div>
          <div className="right">
            <p>Desenvolvido através da combinação de 4 vídeos.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;