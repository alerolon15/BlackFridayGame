const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Counter = require('../models/counter');
const Configuracion = require('../models/configuracion');
const Client = require('../models/client');
const Reward = require('../models/reward');

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

router.post('/loginCliente', async (req,res) =>{
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let phone = "";
  let mail = req.body.mail.toLowerCase();
  let discountCount = 0;
  try {
    let cliente = await Client.findOne({mail});
    if (cliente) {
      res.status(200).json({status: 'success',message: 'Cliente ya existe', cliente});
    }else
    if (!cliente) {
      let data = {
        firstname,
        lastname,
        phone,
        mail,
        discountCount
      };
      let nuevoCliente = new Client(data);
      await nuevoCliente.save(function(err){
        if(!err){
          res.status(200).json({status: 'success',message: 'Cliente Creado con exito', nuevoCliente});
        }
        if(err) {
          res.status(500).json({status: 'error', message: 'error al crear cliente', nuevoCliente})
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({status: 'error',message:'Hubo un error al consultar el cliente.'});
  }
});

router.get('/verPremio', async (req,res) =>{
  let rewardName = req.query.rewardName;
  try {
    let reward = await Reward.findOne({rewardName});

    res.status(200).json({status: 'success', reward});
  } catch (err) {
    console.log(err);
    res.status(200).json({status: 'error',error:'Hubo un error al consultar el premio.'});
  }
});

router.get('/obtenerPremio', async (req,res) =>{
  try {
    let rewardsCount = await Reward.count();

    let random = Math.floor(Math.random() * rewardsCount);
    
    let reward = await Reward.findOne().skip(random);

    res.status(200).json({status: 'success', reward});
  } catch (err) {
    console.log(err);
    res.status(200).json({status: 'error',error:'Hubo un error al consultar el premio.'});
  }
});

router.post('/crearPremio', async (req,res) =>{
  let rewardName = req.body.rewardName;
  let commerce = req.body.commerce;
  let urlImage = req.body.urlImage;
  let mount = req.body.mount;
  let discountText = req.body.discountText;
  try {
    let reward = await Reward.findOne({rewardName});
    if (reward) {
      res.status(200).json({status: 'success',message: 'premio ya existente!', reward});
    }else
    if (!reward) {
      let data = {
        rewardName,
        commerce,
        urlImage,
        mount,
        discountText
      };
      let nuevoReward = new Reward(data);
      await nuevoReward.save(function(err){
        if(!err){
          res.status(200).json({status: 'success',message: 'premio Creado con exito', nuevoReward});
        }
        if(err) {
          console.log(err);
          res.status(500).json({status: 'error', message: 'error al crear premio', nuevoReward})
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({status: 'error',message:'Hubo un error al consultar el premio.'});
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
