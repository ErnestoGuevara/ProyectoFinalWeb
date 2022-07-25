import React, {useEffect, useState} from "react"
import EditarGasto from "./EditarGasto"
import axios from "axios"
import Swal from "sweetalert2"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function Formulario(props) {
  
  // Use Effect Hook to immediately "getExpenses" and "getPresupuesto" from the DB
  useEffect(() => {
    getData();
    getPresupuestoBdd()
  }, [])

  // Use state variables to update data
  const [gastos, setGastos] = useState([])
  const [presupuesto, setPresupuesto] = useState([])
  const [newPresupuesto, setNewPresupuesto] = useState(0)
  const [newGasto, setNewGasto] = useState("")
  const [newCantidad, setNewCantidad] = useState(0)
  const [presupuestoBien, setPresupuestoBien] = useState()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show, setShow] = useState(false)
  const [cantidadTotal, setCantidadTotal] = useState()
  let classPresRes = ""
  const headers = {
    Authorization: "Bearer my-token",
    "My-Custom-Header": "foobar",
  }
  let presupuestoRes = presupuestoBien - cantidadTotal
  
  if (presupuestoRes > presupuestoBien/2){
   
    classPresRes= "alert alert-success"
  }
  if (presupuestoRes <= presupuestoBien/2){
    
    classPresRes = "alert alert-warning"
  }
  if (presupuestoRes <= 0){

    classPresRes = "alert alert-danger"
  }
  

  // Function to delete the budget with the ID
  function deletePresupuesto(id) {
    // Alert to ask the user if he is secure to delete the actual budget
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar presupuesto?",
      text: "No podras revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send a delete to the DB with the ID and
        axios.delete(`https://murmuring-stream-02725.herokuapp.com/api/presupuesto/delete/${id}`, {headers})
          .then((response) => {
            // Animation for budget deleted and update the budget from the DB
            Swal.fire("Eliminado", `Presupuesto eliminado`, "success");
            getPresupuestoBdd();
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    });
  }

  // Variable that gets a function to get the budget from the DB
  const getPresupuestoBdd = () => {
    // Variable to immediately ask for a budget when it is not budget already
    let presupuestoBool = false
    // Request to all budgets from the DB
    axios.get("https://murmuring-stream-02725.herokuapp.com/api/presupuesto").then((response) => {
      // Information filter to only get the budget of the specific day
      const filtrado = response.data.filter((dato) => dato.dia.toLowerCase() == props.dia.toLowerCase()).map((pres) => {
        // Update the budget to the "presupuestoBien" use state variable
        setPresupuestoBien(pres.presupuesto)
        presupuestoBool = true
      })
      // If there is a budget, not show the window to add a new one
      if (presupuestoBool) {
        handleClose()
      } 
      // else, show the window to add a new one
      else {
        handleShow()
      }
      setPresupuesto(response.data);
      console.log(filtrado);
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
  };

  // Function to get the budget from the input box
  function getPresupuesto(e) {
    setNewPresupuesto(e.target.value)
  }

  // Function to get the expense name from the input box
  function getGasto(e) {
    setNewGasto(e.target.value)
  }

  // Function to get the amount of the expense from the input box
  function getCantidad(e) {
    setNewCantidad(e.target.value)
  }

  // Variable that has a function to add a new Budget
  const addPresupuesto = () => {
    // Post the new budget in the DB
    axios.post("https://murmuring-stream-02725.herokuapp.com/api/presupuesto/add",
      {
        presupuesto: newPresupuesto,
        dia: props.dia,
      }
    )
    .then(function (response) {
      console.log(response)
      handleClose()
      getPresupuestoBdd()
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  // Variable that contains a function to add expenses 
  const addData = () => {
    // If the expense is greater than the budget, create an alarm
    if (presupuestoBien < newCantidad) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cantidad de gasto mayor a presupuesto.",
      });
    } 
    // If is not greater, add the expense to the DB
    else {
      axios.post("https://murmuring-stream-02725.herokuapp.com/api/gastos/add", {
        gasto: newGasto,
        cantidad: newCantidad,
        dia: props.dia,
      })
      // When it was added to the DB, create a success alarm
      .then(function (response) {
        Swal.fire({
          icon: "success",
          title: "Añadido exitoso",
          text: "Se ha agregado el gasto con exito",
        })
        //
        getData()
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  // Variable that contains a function to get the expense by day from the DB
  const getData = () => {
    // Request to the DB to get all the expenses
    axios.get("https://murmuring-stream-02725.herokuapp.com/api/gastos")
      .then((response) => {
        // Filter the expense by day and get the exact amount
        const filtrado = response.data
          .filter((dato) => dato.dia.toLowerCase() == props.dia.toLowerCase())
          .map((gasto) => gasto.cantidad)
        // Reduce the budget by the total amount of expenses
        const sumaTotal = filtrado.reduce((prev, curr) => prev + curr, 0)
        
        setCantidadTotal(sumaTotal)
        setGastos(response.data)
      })
      .catch((err) => {
        // Do something for an error here
        console.log("Error Reading data " + err)
      })
  }

  return (
    <div className="container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Presupuesto: </label>
              <input
                type="text"
                placeholder="Agrega tu presupuesto (Ej. 500)"
                id="new-presupuesto"
                className="form-control"
                onChange={getPresupuesto}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* When click on "addPresupuesto", run the "addPresupuesto" function to add a budget */}
          <Button variant="primary" onClick={() => addPresupuesto()}>
            Guardar Presupuesto
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 style={{ textAlign: "center", margin: "20px" }}>
        {/* From the prop, that is the day, print it in Upper Case*/}
        {" "}
        {props.dia.toUpperCase()}
      </h2>

      <div className="card">
        <div className="card-header">Añadir gasto</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Gasto: </label>
              {/* When you are typing in this input box, the "getGasto" function recover the text */}
              <input
                type="text"
                placeholder="Nombre gasto (Ej. Comida)"
                id="new-gasto"
                className="form-control"
                onChange={getGasto}
                required
              />
              <label>Cantidad: </label>
              {/* When you are typing in this input box, the "getCantidad" function recover the text */}
              <input
                type="text"
                placeholder="Agrega Cantidad (Ej. 200)"
                id="new-cantidad"
                className="form-control"
                onChange={getCantidad}
                required
              />
            </div>
          </form>
          <br />
          <div className="text-right">
            {/* When you click, the "addData" function post the expense name and amount in the DB */}
            <button
              id="add-btn"
              className="btn btn-primary "
              onClick={addData}
              required
            >
              Añadir
            </button>
            {/* Print the budget per day */}
            {presupuesto.filter((dato) => dato.dia.toLowerCase() === props.dia.toLowerCase())
              .map((pres) => (
                <div className="d-flex justify-content-around align-items-center">
                  <p>
                    Presupuesto: <span>${presupuestoBien}</span>
                  </p>
                  {/* When you click, the "deletePresupuesto" function delete the budget from the DB */}
                  <button
                    className="btn btn-danger btn-sm rounded-0"
                    type="button"
                    title="Delete"
                    onClick={() => deletePresupuesto(pres._id)}
                  >
                  <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              ))}
              <div className="d-flex justify-content-center align-items-center flex-column">
              <p>Cantidad Total de Gastos: ${cantidadTotal}</p>
              <p className={classPresRes}>Presupuesto Restante: ${presupuestoRes}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Send the day, expenses and the function to get the expenses to the "GastosLis2" component */}
      <EditarGasto dia={props.dia.toLowerCase()} data={gastos} func={getData} />
    </div>
  );
}

export default Formulario;
