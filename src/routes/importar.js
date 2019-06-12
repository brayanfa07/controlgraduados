const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/importacion/importar', (req, res) => {
	if (req.session.loggedin) {

		connection.query('SELECT * FROM tigrupou_graduados.carrera_programa WHERE tipo = 1;', function (err, result1) {
			connection.query('SELECT * FROM tigrupou_graduados.carrera_programa WHERE tipo = 2;', function (err, result2) {
				var obj = {};
				obj.careersList = result1;
				obj.programsList = result2;
				console.log(obj);
				res.render('importacion/importar.html', { obj: obj });
			});
		});

	} else {
		res.redirect('/');
	}
});

module.exports = router;
