import React from 'react'
import HeroSection from '../components/HeroSection'
import SobreNos from '../components/SobreNos'
import GatoCaracteristicas from '../components/GatoCaracteristicas'
import Gatos from '../components/Gatos'
import WhoAreWe from '../components/WhoAreWe'
import Time from '../components/Time'
import Footer from '../components/Footer'
import Especialidades from '../components/VeterinariosPopulares'
import Consultas from '../components/Consultas'

const PaginaInicial = () => {
  return (
    <>
      <HeroSection/>
      <SobreNos/>
      <GatoCaracteristicas/>
      <Gatos/>
      <Especialidades/>
      <Consultas/>
      <WhoAreWe/>
      <Time/>
      <Footer/>
    </>
  )
}

export default PaginaInicial
