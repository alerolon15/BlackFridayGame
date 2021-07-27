const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Configuracion = require('../../models/configuracion');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session && req.session.user && req.session.user.esAdmin){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    //const nosis = await Configuracion.find({id:'Nosis'});
    //const gmail = await Configuracion.find({id:'Gmail'});
    //const tazas = await Configuracion.find({id:'Tazas'});
    //const mensajeAPI = await Configuracion.find({id:'MensajeAPI'});
    //console.log(mensajeAPI[0].configuracion);

    res.render('configuracion/index', { usuario: req.session.user });
  }else{
    res.redirect("/")
  }
});


module.exports = router;
