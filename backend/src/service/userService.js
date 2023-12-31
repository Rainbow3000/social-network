const _userRepository = require('../repository/userRepository');
const validateError = require('../utils/validateError');
const mongoose = require('mongoose'); 
module.exports = {
    get: async(id)=>{
        try {
            const user =  await _userRepository.get(id); 
            if(!user){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy người dùng thành công",
                    statusCode:200,
                    data:user
            };
        } catch (error) {
            
        }
    },
    getAll: async()=>{
        try { 
            const userList =  await _userRepository.getAll(); 
            return {
                success:true,
                message:"Lấy danh sách người dùng thành công",
                statusCode:200,
                data:userList
            }
        } catch (error) {
            
        }
    },

    create: async(data)=>{
        try {
            const userCreated = await _userRepository.create(data);
            return {
                success:true,
                message:"Tạo người dùng thành công",
                statusCode:201,
                data:userCreated,
                errors:null
            } 
        } catch (error) {
           
                 if(error instanceof mongoose.Error.ValidationError){  
                    return {
                        success:false,
                        message:"Tạo người dùng thất bại",
                        statusCode:400,
                        data:null,
                        errors:validateError(error)
                    };
                 }
          
                return {
                    success:false,
                    message:"Tạo người dùng thất bại",
                    statusCode:500,
                    data:null,
                    errors:error?.message
                };
             
        }
    },

    update: async(data,id)=>{
        try {
            const userExisted = await _userRepository.get(id); 
            if(!userExisted){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

            const userUpdated =  await _userRepository.update(data,id);
            return {
                success:true,
                message:"Cập nhật người dùng thành công",
                statusCode:200,
                data:userUpdated
            }
        } catch (error) {
            
            if(error instanceof mongoose.Error.ValidationError){  
                return {
                    success:false,
                    message:"Cập nhật dùng thất bại",
                    statusCode:400,
                    data:null,
                    errors:validateError(error)
                };
             }
      
            return {
                success:false,
                message:"Cập nhật dùng thất bại",
                statusCode:500,
                data:null,
                errors:error?.message
            };
        }
    },
    delete: async(id)=>{
        try {
            const {id} = data; 
            const userExisted = await _userRepository.get(id); 
            if(!userExisted){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:403,
                    data:null
                }
            }

            const userDeleted = await _userRepository.delete(id); 
            return {
                success:true,
                message:"Xóa người dùng thành công",
                statusCode:200,
                data:userDeleted
            }

        } catch (error) {
            
            if(error instanceof mongoose.Error.ValidationError){  
                return {
                    success:false,
                    message:"Xóa người dùng thất bại",
                    statusCode:400,
                    data:null,
                    errors:validateError(error)
                };
             }
      
            return {
                success:false,
                message:"Xóa người dùng thất bại",
                statusCode:500,
                data:null,
                errors:error?.message
            };
        }
    },

    addFriend: async(data,id)=>{
        try {
            const userExisted = await _userRepository.get(id); 
            if(!userExisted){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

            const userUpdated =  await _userRepository.addFriend(data,id);
            return {
                success:true,
                message:"Cập nhật người dùng thành công",
                statusCode:200,
                data:userUpdated
            }
        } catch (error) {
            
            if(error instanceof mongoose.Error.ValidationError){  
                return {
                    success:false,
                    message:"Cập nhật dùng thất bại",
                    statusCode:400,
                    data:null,
                    errors:validateError(error)
                };
             }
      
            return {
                success:false,
                message:"Cập nhật dùng thất bại",
                statusCode:500,
                data:null,
                errors:error?.message
            };
        }
    },

    acceptAddFriend: async(data,id)=>{
        try {
            const userExisted = await _userRepository.get(id); 
            if(!userExisted){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

            const userUpdated =  await _userRepository.acceptAddFriend(data,id);
            return {
                success:true,
                message:"Cập nhật người dùng thành công",
                statusCode:200,
                data:userUpdated
            }
        } catch (error) {
            
            if(error instanceof mongoose.Error.ValidationError){  
                return {
                    success:false,
                    message:"Cập nhật dùng thất bại",
                    statusCode:400,
                    data:null,
                    errors:validateError(error)
                };
             }
      
            return {
                success:false,
                message:"Cập nhật dùng thất bại",
                statusCode:500,
                data:null,
                errors:error?.message
            };
        }
    },

    unAddFriend: async(data,id)=>{
        try {
            const userExisted = await _userRepository.get(id); 
            if(!userExisted){
                return {
                    success:false,
                    message:"Người dùng không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

            const userUpdated =  await _userRepository.unAddFriend(data,id);
            return {
                success:true,
                message:"Cập nhật người dùng thành công",
                statusCode:200,
                data:userUpdated
            }
        } catch (error) {
            
            if(error instanceof mongoose.Error.ValidationError){  
                return {
                    success:false,
                    message:"Cập nhật người dùng dùng thất bại",
                    statusCode:400,
                    data:null,
                    errors:validateError(error)
                };
             }
      
            return {
                success:false,
                message:"Cập nhật người dùng thất bại",
                statusCode:500,
                data:null,
                errors:error?.message
            };
        }
    },
}