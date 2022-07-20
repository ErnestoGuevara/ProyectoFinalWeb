import React,{useEffect,useState}  from 'react'
import GastoList2 from './GastoList2'
import axios from 'axios'
import Swal from 'sweetalert2'
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
        axios.get("http://localhost:4000/api/presupuesto").then(response=>{ 
        //const filtrado = response.data.filter((dato)=> (dato.dia).toLowerCase() == "viernes").map((gasto)=>console.log(gasto))
        setPresupuesto(response.data)
        //console.log(filtrado); 
    }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });;
        
    }
    
    function getPresupuesto(e){
        setNewPresupuesto(e.target.value)
        console.log(e.target.value);
    }
    function getGasto(e){
        setNewGasto(e.target.value)
        //console.log(e.target.value);
    }
    function getCantidad(e){
        setNewCantidad(e.target.value)
        //console.log(e.target.value);
    }
    const addData=()=>{
        if( newPresupuesto <= 0 || newCantidad<=0 || newGasto===""){
            Swal.fire({
                icon: 'error',
                title: 'Campos vacios o incorrectos',
                text: 'Debes llenar todos los campos',
              })
        }else{
            axios.post("http://localhost:4000/api/presupuesto/add",{
                presupuesto:newPresupuesto,
                dia:props.dia
            }).then(function (response) {
    
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
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
       
       
          
         
    }
    const getData= ()=>{
        axios.get("http://localhost:4000/api/gastos/").then(response=>{ 
        //const filtrado = response.data.filter((dato)=> dato.dia == props.dia).map((gasto)=>console.log(gasto))
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
          placeholder="Agrega tu presupuesto (Ej. 500)"
          id="new-presupuesto"
          className="form-control"
          onChange={getPresupuesto}
          
        />
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
                    <p>Presupuesto: <span>$</span>{pres.presupuesto}</p>
                    <button className="btn btn-danger btn-sm rounded-0" type="button"  title="Delete" onClick={()=> deletePresupuesto(pres._id)}><i className="bi bi-trash3-fill" ></i></button>

                </div>
        ))} 
        </div>
      </div>
      </div>

      <GastoList2 dia = {(props.dia).toLowerCase()} data={gastos} func={getData} />

  
    </div>
  )
}

export default Formulario