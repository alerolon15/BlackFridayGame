const express = require('express');
const router = express.Router();
const Client = require('../../models/client');

/* GET todas. */
router.get('/', async (req, res, next) => {
  if(req.session && req.session.user && req.session.user.esAdmin){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    let clients = await Client.find({});

    res.render('cliente/tabla', { usuario: req.session.user, clientes:clients, helpers: {
            date: function (fechaDB)
                  {
                    let meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                    let fechahbs = new Date(fechaDB);
                    let d = fechahbs.getDate();
                    let m = meses[fechahbs.getMonth()];
                    let y = fechahbs.getFullYear();
                    return d + '-' + m + '-' + y;
                  }
        }});
  }else{
    res.redirect("/")
  }
});

/* GET por tipo. */
router.get('/editar/:mail', async (req, res, next) => {
  let mail = req.params.mail;
  if(req.session && req.session.user){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    let clientes = await Client.findOne({mail:mail});


    res.render('cliente/editar', { usuario: req.session.user, cliente:clientes, helpers: {
            date: function (fechaDB)
                  {
                    let meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                    let fechahbs = new Date(fechaDB);
                    let d = fechahbs.getDate();
                    let m = meses[fechahbs.getMonth()];
                    let y = fechahbs.getFullYear();
                    return d + '-' + m + '-' + y;
                  }
        }});
  }else{
    res.redirect("/")
  }
});

router.post('/editarCliente', async (req, res, next) => {
  //console.log(req);
  let mail = req.body.mail;
  if(req.session && req.session.user){
    req.session.user.iniciales = setIniciales(req.session.user.nombre, req.session.user.apellido);

    let cliente = await Client.findOne({mail:mail});

    console.log(cliente);

    cliente.firstname = req.body.nombre;
    cliente.lastname = req.body.apellido;
    cliente.mail = req.body.mail;
    cliente.phone = req.body.phone;
    cliente.discountCount = req.body.discountCount;
     try {
      await cliente.save();
    } catch (e) {
        res.redirect("/Clientes")
    }
    res.redirect('/Clientes');
  }else{
    res.redirect("/")
  }
});


module.exports = router;
