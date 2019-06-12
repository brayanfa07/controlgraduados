const express = require('express');
const router = express.Router();
const connection = require('../database');


//routes
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/consulta/consulta');
    }
    else{
        res.render('index.html');
    }
})

module.exports = router;