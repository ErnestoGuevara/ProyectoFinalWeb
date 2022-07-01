const express= require("express");
const router= express.Router();
const Presupuesto = require("../models/presupuesto");

router.get("/", async (req,res)=>{
    const presupuestos = await Presupuesto.find()
    res.json(presupuestos);   
})
router.get("/:id", async (req,res)=>{
    const presupuesto = await Presupuesto.findById(req.params.id);
    res.json(presupuesto);   
})

router.post("/add",async(req,res)=>{
    const presupuesto = req.body.presupuesto;
    const dia = req.body.dia;

    const nuevoPresupuesto = new Presupuesto({
        presupuesto,
        dia
    });
    await nuevoPresupuesto.save();
    res.json({status: "Presupuesto guardado"})
})
router.put("/edit/:id", async(req,res)=>{
    const presupuesto = req.body.presupuesto;
    const dia = req.body.dia;

    const nuevoPresupuesto = {
        presupuesto,
        dia
    };
     await Presupuesto.findByIdAndUpdate(req.params.id,nuevoPresupuesto);
    //console.log(req.params.id);
    res.json({status: "Presupuesto actualizado"});
})
router.delete("/delete/:id",async(req,res)=>{
    await Presupuesto.findByIdAndDelete(req.params.id);
    res.json({status: "Presupuesto eliminado"});
})
module.exports = router;