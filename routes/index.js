const express = require('express');
const router = express.Router();
const Counter = require('../models/counter');

/* GET home page. */
router.get('/', async (req, res) => {
  if(req.session && req.session.user){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    res.render('index/index', { usuario: req.session.user });
  }else{
    res.redirect("/")
  }
});


module.exports = router;
