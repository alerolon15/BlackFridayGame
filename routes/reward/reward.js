const express = require('express');
const router = express.Router();
const Reward = require('../../models/reward');

/* GET todas. */
router.get('/', async (req, res, next) => {
  if(req.session && req.session.user && req.session.user.esAdmin){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    let rewards = await Reward.find({});

    res.render('reward/index', { usuario: req.session.user, rewards:rewards});
  }else{
    res.redirect("/")
  }
});



module.exports = router;
