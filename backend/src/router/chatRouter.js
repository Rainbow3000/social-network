const express = require('express'); 
const router = express.Router(); 

const chatController = require('../controller/chatController'); 
const  {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.get('/api/chat/:id',verifyToken,verifyTokenAndAuthorization,chatController.get); 
router.get('/api/chat/getbyuser/:id',verifyToken,verifyTokenAndAuthorization,chatController.getByUser); 
router.get('/api/chat/getOnebyuser/:id',verifyToken,verifyTokenAndAuthorization,chatController.getOneByUser); 
router.get('/api/chat',verifyToken,verifyTokenAndAuthorization,chatController.getAll); 
router.post('/api/chat',verifyToken,verifyTokenAndAuthorization,chatController.create); 
router.put('/api/chat/:id',verifyToken,verifyTokenAndAuthorization,chatController.update);  
router.delete('/api/chat/:id',verifyToken,verifyTokenAndAuthorization,chatController.delete); 

module.exports = router; 


