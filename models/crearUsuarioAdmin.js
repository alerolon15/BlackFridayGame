const mongoose = require('mongoose');
const User = require('../models/user');
const Counter = require('../models/counter')
const Configuracion = require('../models/configuracion')
// en caso de ejecutar este archivo desde Node por fuera del proyecto, descomentar las lineas de conexion y desconexion a mongo.
//mongoose.connect('localhost:27017/Phronencial');


let nombre = "administrador";
let apellido = "administrador";
let urlImagen = "/images/logos/zingarocolor.png";
let email = "admin@admin.com";
let password = "admin++";
let esAdmin = true;
let BackOffice = true;

let data = {
  nombre,
  apellido,
  urlImagen,
  email,
  password,
  esAdmin,
  BackOffice
};

const userAdmin = new User(data);

User.findOne({email: email, password: password}, function(err,users){
  if(err){
    console.log(err);
  }
  if(!users) {
    userAdmin.save(function(err){
      if (err) {console.log(err)}
      else {
        console.log(userAdmin);
        console.log("usuario admin creado con exito!");
        //mongoose.disconnect();
       };
    });
  }
  if(users) {
    //console.log(users)
    console.log("usuario admin ya existe!");
    //mongoose.disconnect();
  }
});

/*Counter.findOne({contador:'Solicitud'}, function(err,counter){
  if(err){
    console.log(err);
  }
  if(!counter) {
    let countersave =  new Counter({contador:'Solicitud', seq:1});
    countersave.save(function(err){
      if (err) {console.log(err)}
      else {
        console.log(countersave);
       };
    });
  }
});**/

