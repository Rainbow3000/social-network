const express = require('express'); 
const router = express.Router(); 

const commentController = require('../controller/commentController'); 

const  {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')
router.get('/api/comment/:id',verifyToken,verifyTokenAndAuthorization,commentController.get); 
router.get('/api/comment/getbypost/:id',verifyToken,verifyTokenAndAuthorization,commentController.getByPost); 
router.get('/api/comment',verifyToken,verifyTokenAndAuthorization,commentController.getAll); 
router.post('/api/comment',verifyToken,verifyTokenAndAuthorization,commentController.create); 
router.put('/api/comment/:id',verifyToken,verifyTokenAndAuthorization,commentController.update);  
router.delete('/api/comment/:id',verifyToken,verifyTokenAndAuthorization,commentController.delete); 

module.exports = router; 


