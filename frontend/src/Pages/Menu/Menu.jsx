import React from 'react'
import HeroSection from '../../components/HeroSection'
import About from '../../components/About'
import Qualities from '../../components/Qualities'
import Gatos from '../../components/Gatos'
import WhoAreWe from '../../components/WhoAreWe'
import Time from '../../components/Time'
import Appointment from '../../components/Appointment'
import Footer from '../../components/Footer'

const Menu = () => {
  return (
    <>
      <HeroSection/>
      <About/>
      <Qualities/>
      <Gatos/>
      <WhoAreWe/>
      <Time/>
      <Appointment/>
      <Footer/>
    </>
  )
}

export default Menu
