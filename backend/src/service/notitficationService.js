const _notificationRepository = require('../repository/notificationRepository');
const _postRepository = require('../repository/postRepository')
const validateError = require('../utils/validateError');
const mongoose = require('mongoose'); 
const moment = require('moment')
module.exports = {
    get: async(id)=>{
        try {
            const notification =  await _notificationRepository.findById(id); 
            if(!notification){
                return {
                    success:false,
                    message:"Thông báo không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy thông báo thành công",
                    statusCode:200,
                    data:notification
            };
        } catch (error) {
            
        }
    },

    getByPost: async(postId)=>{
        try {
            const notification =  await _notificationRepository.getByPost(postId); 
            if(!notification){
                return {
                    success:false,
                    message:"Thông báo không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy thông báo thành công",
                    statusCode:200,
                    data:notification
            };
        } catch (error) {
            
        }
    },
    getByUserId: async(userId)=>{
        try {
            const notification =  await _notificationRepository.getByUserId(userId); 
            if(!notification){
                return {
                    success:false,
                    message:"Thông báo không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy thông báo thành công",
                    statusCode:200,
                    data:notification
            };
        } catch (error) {
            
        }
    },
    getAll: async()=>{
        try { 
            const notificationList =  await _notificationRepository.getAll(); 
            return {
                success:true,
                message:"Lấy danh sách thông báo thành công",
                statusCode:200,
                data:notificationList
            }
        } catch (error) {
            
        }
    },

    create: async(data)=>{
        try {
            data.createdDate = moment().format();
            const notificationCreated = await _notificationRepository.create(data);   
          
            return {
                success:true,
                message:"Tạo thông báo thành công",
                statusCode:201,
                data:notificationCreated,
                errors:null
            } 
        } catch (error) {       
                 if(error instanceof mongoose.Error.ValidationError){  
                    return {
                        success:false,
                        message:"Tạo thông báo thất bại",
                        statusCode:400,
                        data:null,
                        errors:validateError(error)
                    };
                }
                    return {
                        success:false,
                        message:"Tạo thông báo thất bại",
                        statusCode:500,
                        data:null,
                        errors:error?.message
                    };
        }
    },

    update: async(id)=>{
        try {
    
            const notificationExisted = await _notificationRepository.get(id); 

            if(!notificationExisted){
                return {
                    success:false,
                    message:"Thông báo không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

        

            notificationExisted.isReaded = !notificationExisted.isReaded;
            

            const notificationUpdated =  await _notificationRepository.update(id,notificationExisted);
            return {
                success:true,
                message:"Cập nhật thông báo thành công",
                statusCode:200,
                data:notificationUpdated
            }
        } catch (error) {
            console.log(error); 
        }
    },
    delete: async(id)=>{
        try {
            const {id} = data; 
            const notificationExisted = await _notificationRepository.get(id); 
            if(!notificationExisted){
                return {
                    success:false,
                    message:"Thông báo không tồn tại",
                    statusCode:403,
                    data:null
                }
            }

            const notificationDeleted = await _notificationRepository.delete(id); 
            return {
                success:true,
                message:"Xóa thông báo thành công",
                statusCode:200,
                data:notificationDeleted
            }

        } catch (error) {
            
        }
    },
}