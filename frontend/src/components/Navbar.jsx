import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [usuario, setUsuario] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={isSticky ? "sticky" : ""}>
        <div className="logo" onClick={()=>{navigate('/'); scrollTo(0,0)}}>GATOS.O.S.</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <NavLink to='/' onClick={() => {setShow(false)}}>
              <li>PÁGINA INICIAL</li>
            </NavLink>
            <NavLink to='/consultas' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>CONSULTAS</li>
            </NavLink>
            <NavLink to='/gatos' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>NOSSOS GATOS</li>
            </NavLink>
            <NavLink to='/veterinarios' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>VETERINÁRIOS ASSOCIADOS</li>
            </NavLink>
          </div>
          {
            usuario
            ? <div className="containerPerfil">
              <img className="imagemPerfil" src="/review_3.png" onClick={() => setMostrar(!mostrar)}/>
              <div className={mostrar ? "perfilDropdown mostrar" : "perfilDropdown esconder"}>
                <p onClick={()=>{navigate('/perfil'); setShow(false); scrollTo(0,0); setMostrar(!mostrar)}}>PERFIL</p>
                <p onClick={()=>{navigate('/dashboard'); setShow(false); scrollTo(0,0); setMostrar(!mostrar)}}>MEU PAINEL</p>
                <p onClick={()=>{navigate('/'); setUsuario(false)}}>SAIR</p>
              </div>
            </div>
            : <button className="loginButton" onClick={() => {navigate('/login'); setShow(false)}}>LOGIN</button>
          }
        </div>
        <div className="hamburger" onClick={() => {setShow(!show); setMostrar(false)}}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;