const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/registrarse', {title : "Black Friday", usuario: req.session.user});
});

router.post('/',function(req,res){
  /* validaciones del registro */
  req.check('nombre', 'Ingrese un nombre!').notEmpty();
  req.check('apellido', 'Ingrese un apellido!').notEmpty();
  req.check('email', 'Ingrese un email valido!').notEmpty().isEmail();
  req.check('password', 'La contraseña debe tener al menos 6 caracteres!').notEmpty().isLength({min:6});
  req.check('password_confirmation', 'Las contraseñas no coinciden!').equals(req.body.password);
  let listaErrores = req.validationErrors();
  if (listaErrores) {
    let mensajes = [];
    listaErrores.forEach(function(error){
        mensajes.push(error.msg);
    });
    let options = {
      title: 'Black Friday',
      errores: mensajes,
      bgClass:'bg-dark',
      datos: req.body
    };
    return res.render('login/registrarse',options);
  };

	let email = req.body.email.toLowerCase();
	let password = req.body.password;
  let nombre = req.body.nombre;
	let apellido = req.body.apellido;

  let data = {
    nombre,
    apellido,
    email,
    password
  };
	User.findOne({email: email}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
		};
		if(users) {
			let options = {
        usuario: req.session.user,
				title: 'Black Friday',
        error: "<div class='alert alert-danger' role='alert'>El mail que desea registrar ya existe.</div>",
        bgClass:'bg-dark',
        datos: req.body
			};
			return res.render('login/registrarse',options);
		};
		if(!users) {
      let usuario = new User(data);
      usuario.save(function(err){
    		if(err){
          let options = {
            usuario: req.session.user,
            title: 'Black Friday',
            bgClass:'bg-dark',
            error: "<div class='alert alert-success' role='alert'>No se pudo crear el usuario.</div>"
          };
          return res.render('login/registrarse',options);
        }
        let options = {
          usuario: req.session.user,
          title: 'Black Friday',
          bgClass:'bg-dark',
          error: "<div class='alert alert-success' role='alert'>El Usuario ha sido creado con exito.</div>"
        };
        res.redirect('/ABMusuarios');
        //return res.render('login/registrarse',options);
    	});
    };
  });
});

module.exports = router;
