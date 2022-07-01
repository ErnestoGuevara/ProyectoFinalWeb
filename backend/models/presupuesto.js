const mongoose = require("mongoose");
const {Schema} = mongoose;

const PresupuestoSchema= new Schema({
    presupuesto: {type: Number, required: true},
    dia: {type: String, required: true}
});

const Presupuesto = mongoose.model("Presupuesto",PresupuestoSchema);

module.exports = Presupuesto;
