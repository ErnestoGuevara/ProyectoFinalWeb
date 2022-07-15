import React from 'react'
import { Link } from "react-router-dom";

function GastosList(props) {
  return (
    <div>
    <ul id="todos" >
    {
    props.datos.filter((dato)=>dato.dia.toLowerCase()==props.dia).map((gasto) => (

        <li
        key={gasto._id}
        >
        <span>{gasto.gasto}</span>  
        </li>                                       
        ))}
    </ul>
   
    </div>
  )
}

export default GastosList