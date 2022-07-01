const express= require("express");
const morgan = require("morgan");

const {mongoose}=require("./database")
const app = express();

//Settings 
app.set("port", process.env.PORT || 4000);
//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/gastos",require("./routes/gastos.routes"));
app.use("/api/presupuesto",require("./routes/presupuesto.routes"));

//Starting serves
app.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
})