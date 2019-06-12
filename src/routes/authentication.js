//const used for the configuration
const express = require('express');
const router = express.Router();
const connection = require('../database');

//const flash = require('express-flash-notification');
//router.use(flash());

//Route for authenticate the user and login
router.post('/auth', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		connection.query('SELECT * FROM tigrupou_graduados.autenticacion_funcionarios WHERE usuario = ? AND contrasena = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/consulta/consulta');
			} else {
				res.redirect('/');
			}			
			res.end();
		});
	} else {
		res.redirect('/');
	}
});

//Route for destroy a session of a user
router.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		res.redirect('/');
	})
});

module.exports = router;