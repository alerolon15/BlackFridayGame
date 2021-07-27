const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session && req.session.user){
    res.render('perfil/cambiarPassword', {title : "BlackFriday", usuario: req.session.user});
  }else{
    res.redirect("/")
  }
});

router.post('/',function(req,res){
  /* validaciones del registro */
  req.check('password', 'Ingrese su contraseña anterior!').notEmpty();
  req.check('nuevapassword', 'La contraseña debe tener al menos 6 caracteres!').notEmpty().isLength({min:6});
  req.check('nuevapassword_confirmation', 'Las contraseñas no coinciden!').equals(req.body.nuevapassword);
  let listaErrores = req.validationErrors();
  if (listaErrores) {
    let mensajes = [];
    listaErrores.forEach(function(error){
        mensajes.push(error.msg);
    });
    let options = {
      title: 'BlackFriday',
      errores: mensajes,
      usuario: req.session.user,
      bgClass:'bg-dark',
      datos: req.body
    };
    return res.render('perfil/cambiarPassword',options);
  };
	let email = req.session.user.email;
	let viejapassword =  req.body.password;
  let nombre = req.session.user.nombre;
	let apellido = req.session.user.apellido;
  let password = req.body.nuevapassword;

  let data = {
    nombre,
    apellido,
    email,
    password
  };
	User.findOne({email: email, password: viejapassword}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
		};
    if(!users) {
			let options = {
				title: 'BlackFriday',
        usuario: req.session.user,
        bgClass:'bg-dark',
        error: "<div class='alert alert-danger' role='alert'>La contraseña anterior es incorrecta.</div>",
			};
			return res.render('perfil/cambiarPassword',options);
		};
    if(users) {
      //console.log(data);

      let usuario = new User(data);

      users.update(data,function(err){
        if(err){console.log(err)};
        let options = {
          title: 'BlackFriday',
          usuario: req.session.user,
          bgClass:'bg-dark',
          error: "<div class='alert alert-success' role='alert'>La contraseña se cambio correctamente.</div>"
        };
        return res.render('perfil/cambiarPassword',options);
    	});
    };
  });
});

module.exports = router;
