import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'

function Jueves() {
  return (
    <div>
        <NavBar/>
      
      <Formulario dia= "Jueves"/>
      <GastoList2 dia= {"Jueves".toLowerCase()}/>

    </div>
  )
}

export default Jueves