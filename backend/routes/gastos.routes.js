const express= require("express");
const router= express.Router();
const Gasto = require("../models/gastos")
router.get("/", async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const gastos = await Gasto.find()
    res.json(gastos);   
})
router.get("/:id", async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const gasto = await Gasto.findById(req.params.id);
    res.json(gasto);   
})

router.post("/add",async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const gasto = req.body.gasto;
    const cantidad = req.body.cantidad;
    const dia = req.body.dia;

    const nuevoGasto = new Gasto({
        gasto,
        cantidad,
        dia
    });
    await nuevoGasto.save();
    res.json({status: "Gasto guardado"})
})
router.put("/edit/:id", async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    const gasto = req.body.gasto;
    const cantidad = req.body.cantidad;
    const dia = req.body.dia;

    const nuevoGasto = {
        gasto,
        cantidad,
        dia
    };
     await Gasto.findByIdAndUpdate(req.params.id,nuevoGasto);
    //console.log(req.params.id);
    res.json({status: "Gasto actualizado"});
})
router.delete("/delete/:id",async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    await Gasto.findByIdAndDelete(req.params.id);
    res.json({status: "Gasto eliminado"});
})
module.exports = router;