import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Menu from './Pages/Menu/Menu';
import PaginaNaoEncontrada from './Pages/PaginaNaoEncontrada/PaginaNaoEncontrada';
import Sucesso from './Pages/Sucesso/Sucesso';
import './App.css'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Menu/>}/>
          <Route path='/sucesso' element={<Sucesso/>}/>
          <Route path='*' element={<PaginaNaoEncontrada/>}/>
        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
