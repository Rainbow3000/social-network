
const userService = require('../service/userService')


module.exports = {
    get: async(req,res,next)=>{
        try {
            const result = await userService.get(req.params?.id); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    getAll: async(req,res,next)=>{
        try { 
            const result =  await userService.getAll(); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    create: async(req,res,next)=>{
        try {
            const result = await userService.create(req.body); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    update: async(req,res,next)=>{
        try {
            const result = await userService.update(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    addFriend: async(req,res,next)=>{
        try {
           
            const result = await userService.addFriend(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    acceptAddFriend: async(req,res,next)=>{
        try {
           
            const result = await userService.acceptAddFriend(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    unAddFriend: async(req,res,next)=>{
        try {
            const result = await userService.unAddFriend(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    updatePostByOtherUser: async(req,res,next)=>{
        try {
            const result = await userService.updatePostByOtherUser(req.body,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    
    delete: async(req,res,next)=>{
        try {
            const result = await userService.delete(req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    
}