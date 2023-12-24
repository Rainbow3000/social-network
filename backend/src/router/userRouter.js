
const express = require('express'); 
const router = express.Router(); 

const userController = require('../controller/userController'); 


router.get('/api/user/:id',userController.get); 
router.get('/api/user',userController.getAll); 
router.post('/api/user',userController.create); 
router.put('/api/user/:id',userController.update); 
router.delete('/api/user/:id',userController.delete); 

module.exports = router; 


