import React from 'react'
import { Link } from "react-router-dom";

function Formulario(props) {
    const addData=()=>{
        alert("Dato guardado en "+ props.dia)
    }

  return (
    <div className='container'>
    <Link to="/">
    <h1>Gasto semanal</h1>
    </Link>

      <div className="d-flex">
        <p>Presupuesto: </p>
        <input
          type="text"
          placeholder="Agrega tu presupuesto"
          id="new-presupuesto"
          className="form-control"
        />
        <p>Gasto: </p>
        <input
          type="text"
          placeholder="Nombre gasto"
          id="new-gasto"
          className="form-control"
        />
        <p>Cantidad: </p>
        <input
          type="text"
          placeholder="Agrega Cantidad"
          id="new-cantidad"
          className="form-control"
        />
        <button
          id="add-btn"
          className="btn btn-primary"
          onClick={addData}
        >
          Add
        </button>
      </div>

  
    </div>
  )
}

export default Formulario