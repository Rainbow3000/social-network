
const express = require('express'); 
const router = express.Router(); 

const postController = require('../controller/postController'); 
const  {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.get('/api/post/stat',verifyToken,verifyTokenAndAuthorization,postController.postStat); 
router.get('/api/post/:id',verifyToken,verifyTokenAndAuthorization,postController.get); 
router.get('/api/post',verifyToken,verifyTokenAndAuthorization,postController.getAll); 
router.get('/api/post/all/byadmin',verifyToken,verifyTokenAndAuthorization,postController.getByAdmin); 
router.get('/api/post/byadmin/:id',verifyToken,verifyTokenAndAuthorization,postController.getByAdminCreated); 
router.get('/api/post/denounce/getlist',verifyToken,verifyTokenAndAuthorization,postController.getDenounceList); 
router.put('/api/post/denounce/:id',verifyToken,verifyTokenAndAuthorization,postController.denounce); 
router.put('/api/post/offence/:id',verifyToken,verifyTokenAndAuthorization,postController.confirmOffence); 
router.put('/api/post/lock/:id',verifyToken,verifyTokenAndAuthorization,postController.lockPost); 
router.get('/api/post/getbyuser/:id',verifyToken,verifyTokenAndAuthorization,postController.getByUser); 
router.post('/api/post',verifyToken,verifyTokenAndAuthorization,postController.create); 
router.put('/api/post/:id',verifyToken,verifyTokenAndAuthorization,postController.update); 
router.put('/api/post/status/:id',verifyToken,verifyTokenAndAuthorization,postController.updateStatus); 
router.put('/api/post/update/byotheruser/:id',verifyToken,verifyTokenAndAuthorization,postController.updatePostByOtherUser); 
router.delete('/api/post/:id',verifyToken,verifyTokenAndAuthorization,postController.delete); 

module.exports = router; 


