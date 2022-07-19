import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'


function Martes() {
  return (
    <div>
        <NavBar/>
      
      <Formulario dia= "Martes"/>
      <GastoList2 dia= {"Martes".toLowerCase()}/>

    </div>
  )
}

export default Martes