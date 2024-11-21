import React from 'react'
import HeroSection from '../../components/HeroSection'
import About from '../../components/About'
import Qualities from '../../components/Qualities'
import Gatos from '../../components/Gatos'
import WhoAreWe from '../../components/WhoAreWe'
import Time from '../../components/Time'
import Footer from '../../components/Footer'
import Especialidades from '../../components/Especialidades'
import Veterinarios from '../../components/Veterinarios'

const PaginaInicial = () => {
  return (
    <>
      <HeroSection/>
      <About/>
      <Qualities/>
      <Gatos/>
      <Especialidades/>
      <Veterinarios/>
      <WhoAreWe/>
      <Time/>
      <Footer/>
    </>
  )
}

export default PaginaInicial
