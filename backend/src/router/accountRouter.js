
const express = require('express'); 
const router = express.Router(); 

const accountController = require('../controller/accountController'); 


router.post('/api/account/register',accountController.register); 
router.post('/api/account/login',accountController.login); 
 
module.exports = router; 


