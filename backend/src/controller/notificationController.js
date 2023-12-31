
const notificationService = require('../service/notitficationService')


module.exports = {
    get: async(req,res,next)=>{
        try {
            const result = await notificationService.get(req.params?.id); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    getByPost: async(req,res,next)=>{
        try {
            const result = await notificationService.getByPost(req.params?.id); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    getAll: async(req,res,next)=>{
        try { 
            const result =  await notificationService.getAll(); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },

    create: async(req,res,next)=>{
        try {
            const result = await notificationService.create(req.body); 
            res.status(result.statusCode).json(result); 
        } catch (error) {
            
        }
    },

    update: async(req,res,next)=>{
        try {
            const result = await notificationService.update(data,req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },
    delete: async(req,res,next)=>{
        try {
            const result = await notificationService.delete(req.params?.id); 
            res.status(result.statusCode).json(result);
        } catch (error) {
            
        }
    },
}