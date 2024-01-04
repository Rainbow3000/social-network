const _postRepository = require('../repository/postRepository');
const _userRepository = require('../repository/userRepository');
const validateError = require('../utils/validateError');
const moment = require('moment')
const mongoose = require('mongoose'); 
module.exports = {
    get: async(id)=>{
        try {
            const post =  await _postRepository.findById(id); 
            if(!post){
                return {
                    success:false,
                    message:"Bài viết không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy bài viết thành công",
                    statusCode:200,
                    data:post
            };
        } catch (error) {
            
        }
    },

    getByUser: async(id)=>{
        try {

            

            let {postList,postShare} =  await _postRepository.getByUser(id);
            
            postShare = postShare.map(item =>{
                item._doc.type = 'SHARE'
                return item; 
            })

            const newData = [...postList,...postShare]


            if(!postList || !postShare){
                return {
                    success:false,
                    message:"Bài viết không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            return {
                    success:true,
                    message:"Lấy bài viết thành công",
                    statusCode:200,
                    data:newData
            };
        } catch (error) {
            console.log(error); 
        }
    },
    getAll: async()=>{
        try { 
            const postList =  await _postRepository.getAll(); 
            return {
                success:true,
                message:"Lấy danh sách bài viết thành công",
                statusCode:200,
                data:postList
            }
        } catch (error) {
            
        }
    },

    create: async(data)=>{
        try {
            data.createdDate = moment().format();
            const postCreated = await _postRepository.create(data);
            return {
                success:true,
                message:"Tạo bài viết thành công",
                statusCode:201,
                data:postCreated,
                errors:null
            } 
        } catch (error) {
                 if(error instanceof mongoose.Error.ValidationError){  
                    return {
                        success:false,
                        message:"Tạo bài viết thất bại",
                        statusCode:400,
                        data:null,
                        errors:validateError(error)
                    };
                 }
            
                return {
                    success:false,
                    message:"Tạo bài viết thất bại",
                    statusCode:500,
                    data:null,
                    errors:error?.message
                };         
        }
    },

    update: async(data,id)=>{
        try {
            const postExisted = await _postRepository.get(id); 
            if(!postExisted){
                return {
                    success:false,
                    message:"Bài viết không tồn tại",
                    statusCode:404,
                    data:null
                }
            }

            const postUpdated =  await _postRepository.update(id,data);
            return {
                success:true,
                message:"Cập nhật bài viết thành công",
                statusCode:200,
                data:postUpdated
            }
        } catch (error) {
            
        }
    },

    updatePostByOtherUser:async(data,postId)=>{
        try {
            const postExisted = await _postRepository.get(postId); 
            if(!postExisted){
                return {
                    success:false,
                    message:"Bài viết không tồn tại",
                    statusCode:404,
                    data:null
                }
            }
            if(data.type === 1){
                const userLiked = postExisted.like.userLiked.find(item => mongoose.Types.ObjectId(item).equals(mongoose.Types.ObjectId(data.userId)));
                if(userLiked === undefined){
                    postExisted.like.userLiked.push(data.userId); 
                    postExisted.like.number ++; 
                }else{
                    postExisted.like.userLiked = postExisted.like.userLiked.filter(item => !mongoose.Types.ObjectId(item).equals(mongoose.Types.ObjectId(data.userId)))
                    postExisted.like.number --; 
                }
            }

            if(data.type === 2){
                postExisted.share.number ++;
                postExisted.share?.userShared.push({
                    user:data.userId,
                    timeShare:moment().format()
                })
                         
            }

            const postUpdated =  await _postRepository.update(postId,postExisted);
            return {
                success:true,
                message:"Cập nhật bài viết thành công",
                statusCode:200,
                data:postUpdated
            }

        } catch (error) {
            console.log(error.message);
        }
    },

    delete: async(id)=>{
        try {
            const {id} = data; 
            const postExisted = await _postRepository.get(id); 
            if(!postExisted){
                return {
                    success:false,
                    message:"Bài viết không tồn tại",
                    statusCode:403,
                    data:null
                }
            }

            const postDeleted = await _postRepository.delete(id); 
            return {
                success:true,
                message:"Xóa bài viết thành công",
                statusCode:200,
                data:postDeleted
            }

        } catch (error) {
            
        }
    },
}