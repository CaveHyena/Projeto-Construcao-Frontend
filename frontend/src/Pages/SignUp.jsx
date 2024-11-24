import React, { useContext } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import Google from "../components/Google";
import { AuthContext } from "../utilities/providers/AuthProvider";
import axios from "axios";

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors }, control, setError } = useForm();
  const senha = watch('senha', ' ');
  const navigate = useNavigate();
  const { signUp, updateUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    setError("");
  
    signUp(data.email, data.senha)
      .then((result) => {
        const usuario = result.user; 
        if (usuario) {
          return updateUser(data.nome, data.fotoUrl).then(() => {
            const usuarioImp = {
              nome: usuario.displayName,
              email: usuario.email,
              fotoUrl: usuario.photoURL,
              role: 'usuario',
              celular: data.celular,
            };
  
            return axios
              .post('http://localhost:4000/usuarios/cadastrar', usuarioImp)
              .then(() => {
                setError(""); 
                navigate('/');
              })
              .catch((err) => {
                setError("api", {
                  type: "manual",
                  message: "Erro ao salvar dados do usuário no backend.",
                });
              });
          });
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("email", {
            type: "manual",
            message: "Este e-mail já está em uso. Use outro e-mail.",
          });
        } else if (err.code === "auth/weak-password") {
          setError("senha", {
            type: "manual",
            message: "A senha deve ter pelo menos 6 caracteres.",
          });
        } else {
          setError("auth", {
            type: "manual",
            message: "Erro ao criar a conta. Tente novamente.",
          });
        }
      });
  };

  return (
    <section className="usuario">
      <div className="container">
        <div className="banner">
          <img className="cat" src="/form.png" alt="res" />
        </div>
        <div className="banner" id="usuario">
          <div className="usuario_form_box">
            <h1>CADASTRAR</h1>
            <p>Crie uma conta para marcar visitas</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  {...register("nome", { required: "Nome é obrigatório" })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  {...register("email", { required: "Email é obrigatório" })}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Senha"
                  {...register("senha", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter pelo menos 6 caracteres",
                    },
                  })}
                />
                <input
                  type="password"
                  placeholder="Confirme a senha"
                  {...register("confirmarSenha", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value) => value === senha || "As senhas não correspondem",
                  })}
                />
              </div>
              <div>
                <Controller
                  name="celular"
                  control={control}
                  rules={{ required: "Número de celular é obrigatório" }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="BR"
                      placeholder="N° de celular"
                    />
                  )}
                />
                <input
                  type="text"
                  placeholder="Imagem URL"
                  {...register("fotoUrl")}
                />
              </div>
              <button type="submit">
                CRIAR CONTA{" "}
                <span>
                  <HiOutlineArrowNarrowRight />
                </span>
              </button>
              {errors.confirmarSenha && (
                <div className="mensagem-erro">
                  <p>{errors.confirmarSenha.message}</p>
                </div>
              )}
              {errors.senha && (
                <div className="mensagem-erro">
                  <p>{errors.senha.message}</p>
                </div>
              )}
              {errors.api && (
                <div className="mensagem-erro">
                  <p>{errors.api.message}</p>
                </div>
              )}
              <div className="google">
                <Google />
              </div>
              <div>
                <p>Já tem uma conta? <Link to="/login">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
