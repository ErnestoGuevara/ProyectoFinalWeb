import React from 'react'
import Formulario from '../components/Formulario'
import GastoList2 from '../components/GastoList2'
import NavBar from '../components/NavBar'

function Lunes() {
  return (
    <div>
      <NavBar/>
      
      <Formulario dia= "Lunes"/>
      <GastoList2 dia= {"Lunes".toLowerCase()}/>
      </div>
  )
}

export default Lunes