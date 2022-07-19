import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'

function Viernes() {
  return (
    <div>
         <NavBar/>

      <Formulario dia= "Viernes"/>
      <GastoList2 dia= {"Viernes".toLowerCase()}/>

    </div>
  )
}

export default Viernes