
const express = require('express'); 
const router = express.Router(); 

const userController = require('../controller/userController'); 
const  {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.put('/api/user/blockbyadmin/:id',verifyToken,verifyTokenAndAuthorization,userController.blockAccount); 
router.get('/api/user/stat',verifyToken,verifyTokenAndAuthorization,userController.userStat); 
router.get('/api/user/dob/:id',verifyToken,verifyTokenAndAuthorization,userController.userDob); 
router.get('/api/user/:id',verifyToken,verifyTokenAndAuthorization,userController.get); 
router.get('/api/user/block/:id',verifyToken,verifyTokenAndAuthorization,userController.getBlockingUser); 
router.get('/api/user',verifyToken,verifyTokenAndAuthorization,userController.getAll); 
router.post('/api/user',verifyToken,verifyTokenAndAuthorization,userController.create); 
router.put('/api/user/friend/:id',verifyToken,verifyTokenAndAuthorization,userController.addFriend); 
router.put('/api/user/block/:id',verifyToken,verifyTokenAndAuthorization,userController.updateBlock); 
router.put('/api/user/friend/accept/:id',verifyToken,verifyTokenAndAuthorization,userController.acceptAddFriend); 
router.put('/api/user/unfriend/:id',verifyToken,verifyTokenAndAuthorization,userController.unAddFriend); 
router.put('/api/user/:id',verifyToken,verifyTokenAndAuthorization,userController.update); 
router.delete('/api/user/:id',verifyToken,verifyTokenAndAuthorization,userController.delete); 

module.exports = router; 


