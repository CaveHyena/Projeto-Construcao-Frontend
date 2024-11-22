import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [token, setToken] = useState(true);
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
        <div className="logo" onClick={()=>navigate('/')}>GATOS.O.S.</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <NavLink to='/' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>PÁGINA INICIAL</li>
            </NavLink>
            <NavLink to='/veterinarios' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>VETERINÁRIOS ASSOCIADOS</li>
            </NavLink>
            <NavLink to='/gatos' onClick={() => {setShow(false); scrollTo(0,0)}}>
              <li>ADOTE</li>
            </NavLink>
          </div>
          {
            token
            ? <div className="containerPerfil">
              <img className="imagemPerfil" src="/review_3.png" onClick={() => setMostrar(!mostrar)}/>
              <div className={mostrar ? "perfilDropdown mostrar" : "perfilDropdown esconder"}>
                <p onClick={()=>navigate('perfil')}>Perfil</p>
                <p onClick={()=>navigate('visitas-marcadas')}>Minhas Visitas Marcadas</p>
                <p onClick={()=>setToken(false)}>Sair</p>
              </div>
            </div>
            : <button className="loginButton" onClick={() => {navigate('/login'); setShow(false)}}>LOGIN</button>
          }
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;