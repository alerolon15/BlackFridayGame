function VerCliente(cuit) {
  //El route de este metodo esta en /routes/Clientes/Cliente.js
  var direccion = "/api/verCliente"
  $.ajax(
    {
      url: direccion,
      type: 'GET',
      data: { MAIL: mail },
      success: function(result){
        if(result) {
          // si obtengo un resultado pero trae error, lo muestro en pantalla
          if(result.error) {
            alert(JSON.stringify(result.error));
          }else{
            //si tengo resultado lo meto en un modal(componente de bootstrap) para mostrarlo en pantalla
            //$('#ModalClienteTitle').text(result.razonsocial)
            console.log(result.cliente);
            document.getElementById('td1').innerHTML = "";
            document.getElementById('td2').innerHTML = "";
            document.getElementById('td3').innerHTML = "";
            document.getElementById('td4').innerHTML = "";

            let td1 = document.getElementById('td1');
            let td2 = document.getElementById('td2');
                td2.appendChild(document.createTextNode(result.cliente.firstname + ' ' + result.cliente.lastname));
            let td3 = document.getElementById('td3');
                td3.appendChild(document.createTextNode(result.cliente.mail));
            let td4 = document.getElementById('td4');
                td4.appendChild(document.createTextNode(result.cliente.discountCount));
            

            //document.getElementById('modal-body-pre').appendChild(div);
            $('#ModalCliente').modal('show')
          }
        };
      },
      error: function(excepcion){
          alert('error');
          console.log(excepcion);
      }
  });
}





function guardarConfig() {
  var direccion = "/api/guardarConfig";
  let usuarioNosis = document.getElementById('usuario').value;
  let passwordNosis = document.getElementById('password').value;
  let usuarioGmail = document.getElementById('gmailusuario').value;
  let passwordGmail = document.getElementById('gmailpassword').value;
  let gmaildestinatarios = document.getElementById('gmaildestinatarios').value;
  let mensajeApi = document.getElementById('mensaje').value;

  $.ajax(
    {
      url: direccion,
      type: 'POST',
      data: {
        usuario:usuarioNosis,
        password:passwordNosis,
        gmailusuario:usuarioGmail,
        gmailpassword:passwordGmail,
        gmaildestinatarios:gmaildestinatarios,
        mensaje:mensajeApi
      },
      success: function(result){
        if(result) {
          // si obtengo un resultado pero trae error, lo muestro en pantalla
          if(result.error) {
            $('#ModalMensajeTitle').text('Mensaje')
            document.getElementById('modal-body-preMensaje').innerHTML = "";
            let div = document.createElement("div");
            let a = document.createAttribute("class");
                a.value = "alert alert-danger";
                div.setAttributeNode(a);
            let p1 = document.createElement("p");
                p1.appendChild(document.createTextNode(result.mensaje));
            div.appendChild(p1);

            document.getElementById('modal-body-preMensaje').appendChild(div);
            $('#ModalMensaje').modal('show')
          }else{
            $('#ModalMensajeTitle').text('Mensaje')
            document.getElementById('modal-body-preMensaje').innerHTML = "";
            let div = document.createElement("div");
            let a = document.createAttribute("class");
                a.value = "alert alert-success";
                div.setAttributeNode(a);
            let p1 = document.createElement("p");
                p1.appendChild(document.createTextNode(result.mensaje));
            div.appendChild(p1);

            document.getElementById('modal-body-preMensaje').appendChild(div);
            $('#ModalMensaje').modal('show')
          }
        };
      },
      error: function(excepcion){
        $('#ModalMensajeTitle').text('Mensaje')
        document.getElementById('modal-body-preMensaje').innerHTML = "";
        let div = document.createElement("div");
        let a = document.createAttribute("class");
            a.value = "alert alert-danger";
            div.setAttributeNode(a);
        let p1 = document.createElement("p");
            p1.appendChild(document.createTextNode("En este momento no se puede guardar la configuracion, intentelo mas tarde."));
        div.appendChild(p1);

        document.getElementById('modal-body-preMensaje').appendChild(div);
        $('#ModalMensaje').modal('show')
      }
  });
}

