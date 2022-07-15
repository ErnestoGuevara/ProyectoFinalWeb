import React,{useState,useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../css/Home.css"
import { Link } from "react-router-dom";
import axios from "axios"
import GastosList from '../components/GastosList';

function Home() {
    useEffect(()=>{
        getData()
    },[])
    const [gastos,setGastos] = useState([])
    
    const getData= ()=>{
        axios.get("http://localhost:4000/api/gastos/").then(response=>{ 
        //const filtrado = response.data.filter((dato)=> dato.dia == "Martes").map((gasto)=>console.log(gasto))
        setGastos(response.data)
        //setGastos(response.data)
        //console.log(response.data); 
    }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });;

    }
    

    
  return (
    <div className="contenedor">
        <h2>Gasto Semanal</h2>
                <div className="contenedor-cards">
                    <div className="container2">

                    <div className="card">
                            <div className="imgBx">
                                <h3>Lunes</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Lunes".toLowerCase()}/>
                                <Link to="/lunes">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                                
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Martes</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Martes".toLowerCase()}/>
                                <Link to="/martes">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Miercoles</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Miercoles".toLowerCase()}/>
                                <Link to="/miercoles">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Jueves</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Jueves".toLowerCase()}/>
                                <Link to="/jueves">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Viernes</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Viernes".toLowerCase()}/>
                                
                                <Link to="/lunes">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Sabado</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Sabado".toLowerCase()}/>
                                <Link to="/sabado">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    <div className="card">
                            <div className="imgBx">
                                <h3>Domingo</h3>
                            </div>
                            <div className="content">
                                <p>(Presupuesto en numero)</p> 
                                <GastosList datos={gastos} dia={"Domingo".toLowerCase()}/>
                                
                                <Link to="/domingo">
                                <button type="button" className="btn btn-warning">Editar</button>
                                </Link>
                            </div>
                    </div>

                    </div>
                </div>
    </div>
  )
}

export default Home