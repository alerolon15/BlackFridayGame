const express = require('express');
const router = express.Router();
const Counter = require('../models/counter');
const Reward = require('../models/reward');
const Cliente = require('../models/client');

/* GET home page. */
router.get('/', async (req, res) => {
  if(req.session && req.session.user){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);
    let rewards = await Reward.find().count();
    let clientes = await Cliente.find().count();

    res.render('index/index', { usuario: req.session.user, rewards:rewards, clientes:clientes });
  }else{
    res.redirect("/")
  }
});


module.exports = router;
