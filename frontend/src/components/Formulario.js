import React,{useEffect,useState}  from 'react'
import GastoList2 from './GastoList2'
import axios from 'axios'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Formulario(props) {
    
    useEffect(()=>{
        getData()
        getPresupuestoBdd()
                
    },[])

    
    const [gastos,setGastos] = useState([])
    const [presupuesto,setPresupuesto] = useState([])
    const [newPresupuesto,setNewPresupuesto] = useState(0)
    const [newGasto, setNewGasto]=useState("")
    const [newCantidad,setNewCantidad] = useState(0)
    const [presupuestoBien,setPresupuestoBien]= useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [cantidadTotal,setCantidadTotal] = useState()
    const headers = { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
  
    
    
    function deletePresupuesto(id){
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar presupuesto?',
            text: "No podras revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:4000/api/presupuesto/delete/${id}`,{headers})
                .then(response => {Swal.fire(
                    'Eliminado',
                    `Presupuesto eliminado`,
                    'success'
                  )
                getPresupuestoBdd()
                }).catch(error => {
                    
                    console.error('There was an error!', error);
                });
              
            }
          })
        }
          
    const getPresupuestoBdd = ()=>{
        let presupuestoBool = false
        axios.get("http://localhost:4000/api/presupuesto").then(response=>{ 
        const filtrado = response.data.filter((dato)=> (dato.dia).toLowerCase() == props.dia.toLowerCase()).map((pres)=>{
          setPresupuestoBien(pres.presupuesto)
          presupuestoBool = true
        })
        
        //console.log(presupuestoBien);
        if (presupuestoBool){
            handleClose()
        }
        else{
            handleShow()
        }
        setPresupuesto(response.data)
        //console.log(filtrado); 
    }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });;
        
    }
    
    function getPresupuesto(e){
        setNewPresupuesto(e.target.value)
        //console.log(e.target.value);
    }
    function getGasto(e){
        setNewGasto(e.target.value)
        //console.log(e.target.value);
    }
    function getCantidad(e){
        setNewCantidad(e.target.value)
        //console.log(e.target.value);
    }
    const addPresupuesto=()=>{
        axios.post("http://localhost:4000/api/presupuesto/add",{
                    presupuesto:newPresupuesto,
                    dia:props.dia
                }).then(function (response) {
                    //console.log(response);
                    handleClose()
                    getPresupuestoBdd()
                })
                .catch(function (error) {
                  console.log(error);
                });
    }
    const addData=()=>{
        
            if(presupuestoBien<newCantidad ){
                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Cantidad de gasto mayor a presupuesto."
                })
            }else{
                    axios.post("http://localhost:4000/api/gastos/add",{
                        gasto:newGasto,
                        cantidad:newCantidad,
                        dia:props.dia
                    }).then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Añadido exitoso',
                            text: 'Se ha agregado el gasto con exito',
                          })
                        getData()
                        
                    //console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

            
           
        }
       
       
          
         
    }
    const getData= ()=>{
        axios.get("http://localhost:4000/api/gastos/").then(response=>{ 
        const filtrado = response.data.filter((dato)=> (dato.dia).toLowerCase() == (props.dia).toLowerCase()).map((gasto)=>gasto.cantidad)
        const sumaTtoal = filtrado.reduce((prev, curr) => prev + curr, 0);
        setCantidadTotal(sumaTtoal)
        
        setGastos(response.data)
        //setGastos(response.data)
        //console.log(response.data); 
    }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
    }

  return (
    <div className='container'>
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
          <Button variant="primary" onClick={()=>addPresupuesto()}>
            Guardar Presupuesto
          </Button>
        </Modal.Footer>
      </Modal>
        
        <h2 style={{textAlign: "center", margin:"20px"}}> {(props.dia).toUpperCase()}</h2>
    
    <div className="card">
    <div className="card-header">
            Añadir gasto
          </div>
    <div className="card-body">      
    <form>
      <div className="form-group">
       
        <label>Gasto: </label>
        <input
          type="text"
          placeholder="Nombre gasto (Ej. Comida)"
          id="new-gasto"
          className="form-control"
          onChange={getGasto}
          required
        />
        <label>Cantidad: </label>
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
      <br/>
            <div className="text-right">
      <button
          id="add-btn"
          className="btn btn-primary "
          onClick={addData}
          required
        >
          Añadir
        </button>
        {presupuesto.filter((dato)=> (dato.dia).toLowerCase() === (props.dia).toLowerCase()).map((pres)=>(
                <div className='d-flex justify-content-around align-items-center'>
                    <p>Presupuesto: <span>$</span>{presupuestoBien}</p>
                    <button className="btn btn-danger btn-sm rounded-0" type="button"  title="Delete" onClick={()=> deletePresupuesto(pres._id)}><i className="bi bi-trash3-fill" ></i></button>

                </div>
        ))} 
        <p>Cantidad Total: {cantidadTotal}</p>
        <p>Presupuesto Restante: {presupuestoBien-cantidadTotal}</p>
        </div>
      </div>
      </div>

      <GastoList2 dia = {(props.dia).toLowerCase()} data={gastos} func={getData} />

  
    </div>
  )
}

export default Formulario