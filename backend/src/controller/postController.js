
const postService = require('../service/postService')


module.exports = {
    get: async(req,res,next)=>{
        try {
            const result = await postService.findById(req.params?.id); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },
    getByUser: async(req,res,next)=>{
        try {
            const result = await postService.getByUser(req.params?.id); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },
    getAll: async(req,res,next)=>{
        try { 
            const result =  await postService.getAll(); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    create: async(req,res,next)=>{
        try {
            const result = await postService.create(req.body); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    update: async(req,res,next)=>{
        try {
            const result = await postService.update(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },
    updateStatus: async(req,res,next)=>{
        try {
            const result = await postService.updateStatus(req.body,req.params?.id);           
            res.status(result.statusCode).json(result);
        } catch (error) {
            console.log(error)
        }
    },

    updatePostByOtherUser: async(req,res,next)=>{
        try {
            const result = await postService.updatePostByOtherUser(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },
    delete: async(req,res,next)=>{
        console.log(req.params.id)
        try {
            const result = await postService.delete(req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },
}