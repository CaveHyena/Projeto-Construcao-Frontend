import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PaginaInicial from './Pages/PaginaInicial/PaginaInicial';
import PaginaNaoEncontrada from './Pages/PaginaNaoEncontrada/PaginaNaoEncontrada';
import Visitas from './Pages/VisitasMarcadas/VisitasMarcadas';
import VisitaMarcadaComSucesso from './Pages/VisitaMarcadaComSucesso/VisitaMarcadaComSucesso';
import Gatos from './Pages/Gatos/Gatos';
import Veterinarios from './Pages/Veterinarios/veterinarios';
import Login from './Pages/Login/Login';
import Perfil from './Pages/Perfil/Perfil';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<PaginaInicial/>}/>
        <Route path='*' element={<PaginaNaoEncontrada/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/gatos' element={<Gatos/>}/>
        <Route path='/gatos/:caracteristica' element={<Gatos/>}/>
        <Route path='/gatos/visita/:id' element={<Gatos/>}/>
        <Route path='/veterinarios' element={<Veterinarios/>}/>
        <Route path='/veterinarios/:especialidade' element={<Veterinarios/>}/>
        <Route path='/veterinarios/visita/:id' element={<Veterinarios/>}/>
        <Route path='/marcar-visita' element={<VisitaMarcadaComSucesso/>}/>
        <Route path='/marcada-com-sucesso' element={<VisitaMarcadaComSucesso/>}/>
        <Route path='/visitas-marcadas' element={<Visitas/>}/>
        <Route path='/visitas-marcadas/:opcao' element={<Visitas/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
