import React from 'react'


function Formulario(props) {
    const addData=()=>{
        alert("Dato guardado en "+ props.dia)
    }

  return (
    <div className='container'>
        <h2 style={{textAlign: "center", margin:"20px"}}> {(props.dia).toUpperCase()}</h2>
    
    <div className="card">
    <div className="card-header">
            Añadir gasto
          </div>
    <div className="card-body">      
    <form>
      <div className="form-group">
        <label>Presupuesto: </label>
        <input
          type="text"
          placeholder="Agrega tu presupuesto"
          id="new-presupuesto"
          className="form-control"
          
        />
        <label>Gasto: </label>
        <input
          type="text"
          placeholder="Nombre gasto"
          id="new-gasto"
          className="form-control"
        />
        <label>Cantidad: </label>
        <input
          type="text"
          placeholder="Agrega Cantidad"
          id="new-cantidad"
          className="form-control"
        />
       
      </div>
      </form>
      <br/>
            <div className="text-right">
      <button
          id="add-btn"
          className="btn btn-primary "
          onClick={addData}
        >
          Añadir
        </button>
        </div>
      </div>
      </div>

  
    </div>
  )
}

export default Formulario