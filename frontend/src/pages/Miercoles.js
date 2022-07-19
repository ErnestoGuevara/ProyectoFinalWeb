import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'
function Miercoles() {
  return (
    <div>
         <NavBar/>
    
      <Formulario dia= "Miercoles"/>
      <GastoList2 dia= {"Miercoles".toLowerCase()}/>

    </div>
  )
}

export default Miercoles