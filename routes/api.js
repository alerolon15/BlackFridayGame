const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Counter = require('../models/counter');
const Configuracion = require('../models/configuracion');


router.get('/verCliente', async (req,res) =>{
  let cuit = req.query.CUIT;
  try {
    let cliente = await Prospecto.findOne({cuit});

    res.status(200).json({status: 'success', cliente});
  } catch (err) {
    console.log(err);
    res.status(200).json({status: 'error',error:'Hubo un error al consultar el cliente.'});
  }
});


router.post('/guardarConfig', async (req, res) => {
  try {
    let nosis = await Configuracion.findOne({id:'Nosis'})
    let gmail = await Configuracion.findOne({id:'Gmail'})
    let MensajeAPI = await Configuracion.findOne({id:'MensajeAPI'})

    nosis.configuracion = [{ usuario: req.body.usuario, password: req.body.password }];
    gmail.configuracion = [{ gmailusuario: req.body.gmailusuario, gmailpassword: req.body.gmailpassword, gmaildestinatarios: req.body.gmaildestinatarios }];
    MensajeAPI.configuracion = [{ mensaje:req.body.mensaje }];

    await nosis.save();
    await gmail.save();
    await MensajeAPI.save();

    res.status(200).json({status: 'success',mensaje:'La configuración se guardo correctamente.'});

  } catch (err) {
    if(!err) {let err = {errors: 'Comuniquese con el administrador'}}
    let error = err.errors;
    //console.log(err);
    res.status(200).json({status: 'Error', error:true , mensaje:'No se pudo guardar la configuración correctamente.'});
  }
});

module.exports = router;
