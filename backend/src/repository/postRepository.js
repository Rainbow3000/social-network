const Post = require('../model/postModel'); 
const User = require('../model/userModel'); 
module.exports = {
    get: async(id)=>{
        try {
            return await Post.findById(id); 
        } catch (error) {
            throw error;
        }
    },

    getByUser: async(id)=>{
        try {
            let postShare = await Post.find({'share.userShared.user':id}).populate({
                path: 'user',
                populate: {
                    path:'_id',
                    select:'userName'
                }
              }).populate({
                path:'share.userShared.user',
                populate: {
                    path:'_id',
                    select:'userName'
                }
              })

            

              const postList =  await Post.find({user:id}).populate({
                  path: 'user',
                  populate: {
                      path:'_id',
                      select:'userName'
                  }
                }); 

           


              
            return {postShare,postList}
        } catch (error) {
        console.log('eee',error); 
            throw error;
        }
    },
    getAll: async()=>{
        try {
            return await Post.find().populate({
                path: 'user',
                populate: {
                    path:'_id',
                    select:'userName'
                }
              })
        } catch (error) {
           throw error; 
        }
    },

    create: async(data)=>{
        try {
            const post = new Post(data);
            return (await post.save()).populate({
                path: 'user',
                populate: {
                    path:'_id',
                    select:'userName'
                }
              });  
        } catch (error) {
            throw error;
        }
    },

    update: async(postId,data)=>{
        try {
            return await Post.findByIdAndUpdate({_id:postId},data,{
                new:true
            }).populate({
                path: 'user',
                populate: {
                    path:'_id',
                    select:'userName'
                }
              });
            
        } catch (error) {
            throw error;
        }
    },
    delete: async(id)=>{
        try {
            await Post.findByIdAndDelete(id);
            return 1;
        } catch (error) {
            throw error;
        }
    },
}