const mongoose = require("mongoose");
const {Schema} = mongoose;

const GastoSchemma= new Schema({
    gasto: {type: String, required: true},
    cantidad: {type: Number, required: true},
    dia: {type: String, required: true}
});

const Gasto = mongoose.model("Gasto",GastoSchemma);

module.exports = Gasto;
