import React from 'react'
import Formulario from '../components/Formulario'
import NavBar from '../components/NavBar'
import GastoList2 from '../components/GastoList2'
function Sabado() {
  return (
    <div>
         <NavBar/>
     
      <Formulario dia= "Sabado"/>
      <GastoList2 dia= {"Sabado".toLowerCase()}/>

    </div>
  )
}

export default Sabado