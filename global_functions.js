const nodemailer = require('nodemailer');

//Crear Iniciales de usuario para view
setIniciales = (nombre, apellido) => {
  let inicialN = nombre.substring(0,1);
  let inicialA = apellido.substring(0,1);
  let iniciales = inicialN.toUpperCase() + inicialA.toUpperCase();
  return iniciales;
};


enviarMaildeSolicitud = (solicitud, Gmail) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Gmail.gmailusuario,
      pass: Gmail.gmailpassword
    }
  });
  let mailOptions = {
    from: Gmail.gmailusuario,
    to: Gmail.gmaildestinatarios,
    subject: 'Nueva solicitud de prestamo Credilike',
    html: '<h1>Ingreso una nueva solicitud desde Credilike!</h1>'
          + '<p>Numero de Solicitud: ' + solicitud.numeroSolicitud + '</p>'
          + '<p>Monto Solicitado: $' + solicitud.montoSolicitado + '</p>'
          + '<p>Cuit: ' + solicitud.cuit + '</p>'
          + '<p>Fecha: ' + solicitud.fechaAlta + '</p>'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
  });
}
