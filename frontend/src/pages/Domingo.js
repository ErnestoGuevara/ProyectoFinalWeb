import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'

function Domingo() {
  return (
    <div>
         <NavBar/>
     
      <Formulario dia= "Domingo"/>
      <GastoList2 dia= {"Domingo".toLowerCase()}/>

    </div>
  )
}

export default Domingo