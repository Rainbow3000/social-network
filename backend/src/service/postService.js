const _postRepository = require('../repository/postRepository');
const _userRepository = require('../repository/userRepository');
const _accountRepository = require('../repository/accountRepository');
const _notitficationRepository = require('../repository/notificationRepository');
const validateError = require('../utils/validateError');
const moment = require('moment')
const mongoose = require('mongoose'); 
const {getSocketIo}  = require('../../src/socket')

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
    getDenouncePostList: async()=>{
        try { 
            const postList =  await _postRepository.getAll(); 
            const deboundList = postList.filter(item => item.denounce.length > 0); 
            return {
                success:true,
                message:"Lấy danh sách bài viết bị tố cáo thành công",
                statusCode:200,
                data:deboundList
            }
        } catch (error) {
            
        }
    },
    create: async(data)=>{
        try {
            data.createdDate = moment().format();
            const postCreated = await _postRepository.create(data);
            const userExisted = await _userRepository.get(data.user); 
            if(userExisted){
                userExisted.postNumber++; 
                await _userRepository.update(userExisted,data.user);
            } 

        

            const {ioObject,socketObject,userOnline} = getSocketIo();
            const admin = await _accountRepository.getAdmin(); 
            if(admin){
                const notificationCreated = await _notitficationRepository.create({
                    notifiType:'CREATE_POST',
                    content:`đã tạo một bài viết mới`,
                    fromUser:userExisted._id,
                    createdAt:moment().format(),
                    user:admin._id
                })
    
               
                if(ioObject && socketObject){  
                    if(userOnline.has(admin._id.toString())){
                        const socketId = userOnline.get(admin._id.toString());
                        socketObject.join(socketId)
                   
                        ioObject.to(socketId).emit("user-create-post",notificationCreated);               
                    }
        
                }
            }
    
            

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
        const {userId} = data; 
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
            
            console.log(postExisted.share.userShared); 
            postExisted.share.userShared = postExisted.share.userShared.filter(item => !item.user.equals(userId)); 
            const postUpdated =  await _postRepository.update(postExisted._id,postExisted);
            return {
                success:true,
                message:"Xóa chia sẻ bài viết thành công",
                statusCode:200,
                data:postUpdated
            }
        } catch (error) {
            
        }
    },

    denounce: async(data,id)=>{
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
            if(postExisted.denounce.find(item => item.user.equals(data.user)) === undefined){
                postExisted.denounce.push({user:data.user,denounceContent:data.denounceContent,denounceDate:moment().format()}); 
                const postUpdated =  await _postRepository.update(id,postExisted);
                return {
                    success:true,
                    message:"Tố cáo bài viết thành công",
                    statusCode:200,
                    data:postUpdated
                }
            }else {
                return {
                    success:true,
                    message:"Bài viết đã được bạn tố cáo trước đó",
                    statusCode:200,
                    data:null
                }
            }

        } catch (error) {
            
        }
    },

    updateStatus: async(data,id)=>{

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

            postExisted.status = data.status; 
            const postUpdated = await _postRepository.update(id,postExisted);
            return {
                success:true,
                message:"Cập nhật bài viết thành công",
                statusCode:200,
                data:postUpdated
            }
        } catch (error) {
            console.log(error)
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
            
        }
    },

    lockPost:async(postId)=>{
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
            if(postExisted.status === -1){
                postExisted.status = 1;
            }else{
                postExisted.status = -1; 
            }

            const postUpdated =  await _postRepository.update(postId,postExisted);


            return {
                success:true,
                message:"Cập nhật bài viết thành công",
                statusCode:200,
                data:postUpdated
            }

        } catch (error) {
            
        }
    },

    delete: async(id)=>{
        try {
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

    postStat: async()=>{
        try {
            const post = await _postRepository.postStat(); 
            return {
                success:true,
                message:"Thống kê bài viết thành công",
                statusCode:200,
                data:post
            }

        } catch (error) {
            
        }
    },
}