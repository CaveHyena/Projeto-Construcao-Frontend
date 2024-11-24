import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PaginaInicial from './Pages/PaginaInicial';
import PaginaNaoEncontrada from './Pages/PaginaNaoEncontrada';
import Visitas from './Pages/VisitasMarcadas';
import VisitaMarcadaComSucesso from './Pages/VisitaMarcadaComSucesso';
import Gatos from './Pages/Gatos';
import Consultas from './Pages/Consultas';
import Login from './Pages/Login';
import Visita from './Pages/Visita';
import Veterinarios from './Pages/Veterinarios';
import GatoInfo from './Pages/GatoInfo';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<PaginaInicial/>}/>
        <Route path='*' element={<PaginaNaoEncontrada/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/gatos' element={<Gatos/>}/>
        <Route path='/gato/:id' element={<GatoInfo/>}/>
        <Route path='/consultas' element={<Consultas/>}/>
        <Route path='/veterinarios' element={<Veterinarios/>}/>
        <Route path='/visita/:id' element={<Visita/>}/>
        <Route path='/marcada-com-sucesso' element={<VisitaMarcadaComSucesso/>}/>
        <Route path='/visitas-marcadas' element={<Visitas/>}/>
        <Route path='/visitas-marcadas/:opcao' element={<Visitas/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
