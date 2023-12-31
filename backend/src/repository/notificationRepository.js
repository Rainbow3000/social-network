const Notification = require('../model/notificationModel'); 
module.exports = {
    get: async(id)=>{
        try {
            return await Notification.findById(id).populate(
                {
                    path:'children',
                    populate:{
                        path:'user',
                        populate:{
                            path:'_id'
                        }
                    }
                    
                }
            ); 
        } catch (error) {
            throw error;
        }
    },

    getByPost: async(id)=>{
        try {
            return await Notification.find({post:id}).limit(10).populate(
                {
                    path:'user',
                    populate: { path: '_id' }
                },
            )
        } catch (error) {
            throw error;
        }
    },
    getAll: async()=>{
        try {
            return await Notification.find().populate({
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
            const notification = new Notification(data);
            return await notification.save(); 
            // return await Notification.findById({_id:commentCreated._id}).populate(
            //     {
            //         path:'user',
            //         populate: { path: '_id' }
            //     },
            // ).populate(
            //     {
            //         path:'children',
            //         populate:{
            //             path:'user',
            //             populate:{
            //                 path:'_id'
            //             }
            //         }
                    
            //     }
            // );
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    update: async(commentId,data)=>{
        try {
            return await Comment.findByIdAndUpdate({_id:commentId},data,{
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
            await Comment.findByIdAndDelete(id);
            return 1;
        } catch (error) {
            throw error;
        }
    },
}