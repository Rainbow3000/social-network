
const express = require('express'); 
const router = express.Router(); 

const accountontroller = require('../controller/accountController'); 


router.post('/api/account/register',accountontroller.register); 
router.post('/api/account/login',accountontroller.login); 
 
module.exports = router; 


