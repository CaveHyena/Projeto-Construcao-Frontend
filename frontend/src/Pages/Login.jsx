import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import Google from "../components/Google";
import useAuth from "../hooks/useAuth";

const Entrar = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const location = useLocation();
  const {login, error, setError, loader, setLoader} = useAuth();
  const navigate = useNavigate();
  
    const entrar = async (e) => {
      e.preventDefault(); 
      setError('');
      
      const data = new FormData(e.target);
      const formData = Object.fromEntries(data)
      login(formData.email, formData.senha).then(() => {
        navigate(location.state?.from || '/')
      }).catch((err) => {
        setError(err.code);
        setLoader(false);
      })
    };
  
    return (
      <section className="usuario">
        <div className="container">
          <div className="banner">
            <img className="cat" src="/form.png" alt="res" />
          </div>
          <div className="banner" id="usuario">
            <div className="usuario_form_box">
              <h1>LOGIN</h1>
              <p>Entre na sua conta para marcar visitas</p>
              <form onSubmit={entrar}> 
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
                <button type="submit">
                  LOGIN{" "}
                  <span>
                    <HiOutlineArrowNarrowRight />
                  </span>
                </button>
                <div className='google'>
                  <Google />
                </div>
                <div className='google'>
                  <p>Sem conta? <Link to='/sign-up'>Sign up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    ); 
};

export default Entrar;
