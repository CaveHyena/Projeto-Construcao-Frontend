import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Google = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await googleLogin();
      const usuario = userCredential.user;

      const usarioImp = {
        nome: usuario.displayName,
        email: usuario.email,
        fotoUrl: usuario.photoURL,
        role: 'usuario',
        celular: '5512985645665',
      };

      await axios.post('http://localhost:4000/usuarios/cadastrar', usarioImp);
      navigate('/'); 
    } catch (error) {
      console.error('Erro durante login ou cadastro:', error.response?.data || error.message);
    }
  };

  return (
    <div className="google-button-container">
      <button onClick={handleLogin} className="google-button">
        <FaGoogle className="google-icon" />
        <h2 className="google-text">Continue with Google</h2>
      </button>
    </div>
  );
};

export default Google;
