const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/recuperar', {layout:'layoutLogin', title : "Black Friday", bgClass:'bg-dark'});
});

router.post('/',function(req,res){
  /* validaciones del registro */
  req.check('email', 'Ingrese un email valido!').notEmpty().isEmail();

  let listaErrores = req.validationErrors();
  if (listaErrores) {
    let mensajes = [];
    listaErrores.forEach(function(error){
        mensajes.push(error.msg);
    });
    let options = {
      layout:'layoutLogin',
      title: 'Black Friday',
      errores: mensajes,
      bgClass:'bg-dark'
    };
    return res.render('login/recuperar',options);
  };

	let email = req.body.email.toLowerCase();

	User.findOne({email: email}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
		};
		if(!users) {
      let options = {
        layout:'layoutLogin',
        title: 'Black Friday',
        bgClass:'bg-dark',
        error: "<div class='alert alert-danger' role='alert'>El mail que ingresaste no esta registrado.</div>"
      };
      return res.render('login/recuperar',options);
    };
    if(users) {
			let options = {
        layout:'layoutLogin',
				title: 'Black Friday',
        error: "<div class='alert alert-success' role='alert'>Hemos enviado un mail a tu casilla de correo.</div>",
        bgClass:'bg-dark'
			};
			return res.render('login/recuperar',options);
		};
  });
});

module.exports = router;
