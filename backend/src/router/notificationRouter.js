const express = require('express'); 
const router = express.Router(); 

const notificationController = require('../controller/notificationController'); 
const  {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.get('/api/notification/:id',verifyToken,verifyTokenAndAuthorization,notificationController.get); 
router.get('/api/notification/getbypost/:id',verifyToken,verifyTokenAndAuthorization,notificationController.getByPost); 
router.get('/api/notification/getbyuser/:id',verifyToken,verifyTokenAndAuthorization,notificationController.getByUserId); 
router.get('/api/notification',verifyToken,verifyTokenAndAuthorization,notificationController.getAll); 
router.post('/api/notification',verifyToken,verifyTokenAndAuthorization,notificationController.create); 
router.post('/api/notification/byadmin',verifyToken,verifyTokenAndAuthorization,notificationController.createByAdmin); 
router.put('/api/notification/:id',verifyToken,verifyTokenAndAuthorization,notificationController.update);  
router.delete('/api/notification/:id',verifyToken,verifyTokenAndAuthorization,notificationController.delete); 
 
 
module.exports = router; 


