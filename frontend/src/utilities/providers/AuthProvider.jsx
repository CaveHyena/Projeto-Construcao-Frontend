import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../config/firebase.init';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth(app); 

  // SIGNUP NOVO USUARIO
  const signUp = async (email, password) => {
    try {
      setLoader(true);
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // LOGIN USUARIO
  const login = async (email, password) => { 
    try {
      setLoader(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // LOGOUT USUARIO 
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // UPDATE PERFIL USUARIO
  const updateUser = async (nome, fotoUrl) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: nome,
        photoURL: fotoUrl,
      });
      setUsuario(auth.currentUser);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // GOOGLE LOGIN
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoader(true);
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.code);
      throw error;
    }
  };

  // OBSERVER FOR USERS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      if (user) {
        try {
          const response = await axios.post('http://localhost:4000/usuarios/token', {
            email: user.email,
            nome: user.displayName,
          });
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
        } catch (error) {
          console.error('Erro ao salvar token:', error);
        }
      } else {
        localStorage.removeItem('token');
      }
      setLoader(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    usuario,
    signUp,
    login,
    logout,
    updateUser,
    googleLogin,
    error,
    setError,
    loader,
    setLoader
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
