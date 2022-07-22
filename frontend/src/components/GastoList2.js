import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Swal from "sweetalert2"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function GastoList2(props) {
    useEffect(()=>{
        props.func()
    },[])
   
    
    const [gastoChar,setGastoChar] = useState("")
    const [cantidadChar,setCantidadChar] = useState("")
    const [idChar,setIdChar] = useState("")
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const headers = { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    function editGasto(id){
        axios.get(`https://murmuring-stream-02725.herokuapp.com/api/gastos/${id}`).then(response=>{ 
        setGastoChar(response.data.gasto)
        setCantidadChar(response.data.cantidad)
        setIdChar(response.data._id)
        console.log(response.data); 
        }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
      handleShow()

    }
    function getGasto(e){
        setGastoChar(e.target.value)    
    }
    function getCantidad(e){
        setCantidadChar(e.target.value)   
    }
    function saveChanges(id){
        axios.put(`https://murmuring-stream-02725.herokuapp.com/api/gastos/edit/${id}`,{
            gasto:gastoChar,
            cantidad:cantidadChar,
            dia: props.dia
        }).then((response)=>{
            Swal.fire({
                icon: 'success',
                title: 'Edición exitosa',
                text: 'Se ha editado el gasto con exito',
              })
              handleClose()
              props.func()

        })
        .catch(error => {     
            console.error('There was an error!', error);
        });
    }
    function deleteGasto(id){
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar gasto?',
            text: "No podras revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://murmuring-stream-02725.herokuapp.com/api/gastos/delete/${id}`,{headers})
                .then(response => {Swal.fire(
                    'Eliminado',
                    `Gasto eliminado`,
                    'success'
                  )
                props.func()
                }).catch(error => {
                    
                    console.error('There was an error!', error);
                });
              
            }
          })
          

    }
    

  return (
    <div className='container' style={{marginTop: "20px"}}>
        
         <div className="card">
         <div className="card-header">
            Lista de gastos de {props.dia}
          </div>
        <div className="card-body">     
        <ul id="todos" className="list-group">
        {
        props.data.filter((dato)=>dato.dia.toLowerCase()===props.dia).map((gasto) => (

        <li
        key={gasto._id}
        className="list-group-item d-flex justify-content-between align-items-center"
        >
        <span>{gasto.gasto} ${gasto.cantidad}</span>
        
        <div>
        <button className="btn btn-primary btn-sm rounded-0" type="button"  title="Edit" style={{marginRight:"10px"}} onClick={()=> editGasto(gasto._id)}><i className="bi bi-pencil-fill"></i></button>
        <button className="btn btn-danger btn-sm rounded-0" type="button"  title="Delete" onClick={()=> deleteGasto(gasto._id)}><i className="bi bi-trash3-fill" ></i></button>
        </div>
        
        
        </li>                                       
        ))}
    </ul>
    </div>
      
    </div>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={()=>saveChanges(idChar)}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GastoList2