const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/user');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.session && req.session.user && req.session.user.esAdmin){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    const usuarios = await User.find({});

    res.render('ABMusuarios/index', { usuario: req.session.user, usuarios:usuarios });
  }else{
    res.redirect("/")
  }
});

router.get('/borrar/:id', function(req,res){
  let id = req.params.id;
  //console.log(req.params.id);
  if(req.session && req.session.user && req.session.user.esAdmin){
    User.findOneAndDelete({_id:id}, function(err, users){
      if (err) {
        console.log(err);
      }
      //console.log('ok')
      res.redirect('/ABMusuarios');
    });
  }else{
    res.redirect('/');
  };
});

router.post('/Activar', function(req, res, next) {
  let id = req.body.ID;
  let tipo = req.body.TIPO;
  let activar = req.body.Activar;
  User.findOne({_id:id}, function(err, user){
    if(err){
      res.status(400);
      res.send('Error al activar privilegios');
    };
    if (tipo == "A") {
      user.esAdmin = activar;
    }
    if (tipo == "P") {
      user.BackOffice = activar;
    }
    
    user.save(function(error){
      if(error){
        res.status(400);
        res.send('Error al activar privilegios');
      }else{
        res.send('OK');
      };
    });
  });
});

module.exports = router;
