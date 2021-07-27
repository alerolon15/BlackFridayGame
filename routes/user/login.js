const express = require('express');
const router = express.Router();
const User = require('../../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.reset();
  res.render('login/login', { layout:'layoutLogin', title: 'Black Friday', bgClass:'bg-dark' });
});

router.post('/login',function(req,res){

	let email = req.body.email.toLowerCase();
	let password = req.body.password;

	User.findOne({email: email, password: password}, function(err,users){
		if(err){
			console.log(err);
			return res.status(500).send();
			req.session.reset();
		}
		if(!users) {
			req.session.reset();
			let options = {
        layout:'layoutLogin',
				title: 'Black Friday',
        bgClass:'bg-dark',
        error: "<div class='alert alert-danger' role='alert'>El usuario o la contraseña no son correctas</div>"
			}
			return res.render('login/login',options)
		}
		if(users) {
			req.session.user = users;
			return res.redirect('/index')}
    });
});

module.exports = router;
