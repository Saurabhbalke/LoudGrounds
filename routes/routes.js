const express = require("express");
const hostController = require('../controller/hostController');
const providerController = require('../controller/providerController');

const router = express.Router();

// create new task
router.post('/host', hostController.addHost);

// display all task 
router.get('/host', hostController.getAllHost);




// create new task
router.post('/provider', providerController.addProvider);

// display all task 
router.get('/provider', providerController.getAllProvider);

module.exports = router;