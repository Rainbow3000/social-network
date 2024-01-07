
const express = require('express'); 
const router = express.Router(); 

const postController = require('../controller/postController'); 


router.get('/api/post/stat',postController.postStat); 
router.get('/api/post/:id',postController.get); 
router.get('/api/post',postController.getAll); 
router.get('/api/post/getbyuser/:id',postController.getByUser); 
router.post('/api/post',postController.create); 
router.put('/api/post/:id',postController.update); 
router.put('/api/post/status/:id',postController.updateStatus); 
router.put('/api/post/update/byotheruser/:id',postController.updatePostByOtherUser); 
router.delete('/api/post/:id',postController.delete); 

module.exports = router; 


