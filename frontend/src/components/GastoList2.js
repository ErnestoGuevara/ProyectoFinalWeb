import React, {useEffect, useState} from "react"
import axios from "axios"
import Swal from "sweetalert2"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function GastoList2(props) {

  // This hook, runs the function to get the expenses when the page load
  useEffect(() => {
    props.func()
  }, [])

  // Use state variables
  const [gastoChar, setGastoChar] = useState("")
  const [cantidadChar, setCantidadChar] = useState("")
  const [idChar, setIdChar] = useState("")
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const headers = {
    Authorization: "Bearer my-token",
    "My-Custom-Header": "foobar",
  }

  // Function to edit a expense in the DB
  function editGasto(id) {
    // Get the expense from an ID 
    axios.get(`https://murmuring-stream-02725.herokuapp.com/api/gastos/${id}`).then((response) => {
      // The response is the total expense JSON format, so it can be separated by expense, amount and ID.
      setGastoChar(response.data.gasto)
      setCantidadChar(response.data.cantidad)
      setIdChar(response.data._id)
    })
    .catch((err) => {
      // Do something for an error here
      console.log("Error Reading data " + err)
    })
    // Show the success transaction
    handleShow()
  }

  // From what you are typing in the input box, set the expense name
  function getGasto(e) {
    setGastoChar(e.target.value);
  }

  // From what you are typing in the input box, set the expense amount
  function getCantidad(e) {
    setCantidadChar(e.target.value);
  }

  // Save the changes by id
  function saveChanges(id) {
    // Update the expense in the DB
    axios.put(`https://murmuring-stream-02725.herokuapp.com/api/gastos/edit/${id}`,
      {
        gasto: gastoChar,
        cantidad: cantidadChar,
        dia: props.dia,
      }
    )
    .then((response) => {
      Swal.fire({
        icon: "success",
        title: "Edición exitosa",
        text: "Se ha editado el gasto con exito",
      })
      // Function to get expense
      handleClose()
      props.func()
    })
    .catch((error) => {
      console.error("There was an error!", error)
    })
  }

  // Function to delete a expense
  function deleteGasto(id) {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar gasto?",
      text: "No podras revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      // Delete the expense from the DB
      if (result.isConfirmed) {
        axios.delete(`https://murmuring-stream-02725.herokuapp.com/api/gastos/delete/${id}`,{ headers })
        .then((response) => {
          // Get the expense
          Swal.fire("Eliminado", `Gasto eliminado`, "success")
          props.func()
        })
        .catch((error) => {
          console.error("There was an error!", error)
        })
      }
    })
  }

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="card">
        <div className="card-header">Lista de gastos de {props.dia}</div>
        <div className="card-body">
          <ul id="todos" className="list-group">
            {/* In the list of expenses container, filter the expenses by day with all the expenses */}
            {props.data.filter((dato) => dato.dia.toLowerCase() === props.dia).map((gasto) => (
              <li
                key={gasto._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {/* From the DB, print the expense name and the amount */}
                  {gasto.gasto} ${gasto.cantidad}
                </span>

                <div>
                  {/* Button to edit an expense */}
                  <button
                    className="btn btn-primary btn-sm rounded-0"
                    type="button"
                    title="Edit"
                    style={{ marginRight: "10px" }}
                    onClick={() => editGasto(gasto._id)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  {/* Button to delete an expense */}
                  <button
                    className="btn btn-danger btn-sm rounded-0"
                    type="button"
                    title="Delete"
                    onClick={() => deleteGasto(gasto._id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Window to edit an expense */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Gasto: </label>
              <input
                type="text"
                placeholder="Nombre gasto"
                id="new-gasto"
                className="form-control"
                value={gastoChar}
                onChange={getGasto}
              />
              <label>Cantidad: </label>
              <input
                type="text"
                placeholder="Agrega Cantidad"
                id="new-cantidad"
                className="form-control"
                value={cantidadChar || ""}
                onChange={getCantidad}
              />
            </div>
          </form>
        </Modal.Body>
        {/* Window footer to close or save changes */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => saveChanges(idChar)}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GastoList2;