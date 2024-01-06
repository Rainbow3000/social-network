
const express = require('express'); 
const router = express.Router(); 

const userController = require('../controller/userController'); 


router.get('/api/user/:id',userController.get); 
router.get('/api/user/block/:id',userController.getBlockingUser); 
router.get('/api/user',userController.getAll); 
router.post('/api/user',userController.create); 
router.put('/api/user/friend/:id',userController.addFriend); 
router.put('/api/user/block/:id',userController.updateBlock); 
router.put('/api/user/friend/accept/:id',userController.acceptAddFriend); 
router.put('/api/user/unfriend/:id',userController.unAddFriend); 
router.put('/api/user/:id',userController.update); 
router.delete('/api/user/:id',userController.delete); 

module.exports = router; 


