const User = require('../model/userModel'); 
module.exports = {
    get: async(id)=>{
        try {
            return await User.findById(id).populate({
                path:'_id',
                select:'-password'
            }); 
        } catch (error) {
            throw error;
        }
    },
    getAll: async()=>{
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    },

    create: async(data)=>{
        try {
            const user = new User(data);
            return await user.save();  
        } catch (error) {
            throw error;
        }
    },

    update: async(data,id)=>{
        try {
            return await User.findByIdAndUpdate({_id:id},data,{
                new:true
            });
            
        } catch (error) {
            throw error;
        }
    },
    addFriend: async(data,id)=>{
        try {
            const userSendRequest = await User.findById({_id:id});
            if(userSendRequest){
                const requestExisted =  userSendRequest.requestAddFriend.find(item => item.equals(data.userId));
                if(requestExisted === undefined){         
                        userSendRequest.requestAddFriend.push(data.userId);              
                }
            }

            const requestAddFriendUpdated =  await User.findByIdAndUpdate({_id:id},userSendRequest,{
                new:true
            });


            const userReceiveRequest  = await User.findById({_id:data.userId}); 

            if(userReceiveRequest){
                const requestExisted = userReceiveRequest.requestAddFriendFromUser.find(item => item.equals(id));
                if(requestExisted === undefined){                  
                    userReceiveRequest.requestAddFriendFromUser.push(id)             
                }
            }


            const requestAddFriendFromUserUpdated =  await User.findByIdAndUpdate({_id:data.userId},userReceiveRequest,{
                new:true
            });



           return requestAddFriendFromUserUpdated.requestAddFriendFromUser;
            
        } catch (error) {
            throw error;
        }
    },
   

    acceptAddFriend: async(data,id)=>{
        try {
            const userSendRequest = await User.findById({_id:id});
            if(userSendRequest){
                const requestExisted = userSendRequest.requestAddFriend.find(item => item.equals(data.userId));
                if(requestExisted !== undefined){         
                    userSendRequest.requestAddFriend =  userSendRequest.requestAddFriend.filter(item => !item.equals(data.userId));              
                }

                const findFriendExisted = userSendRequest.friends.find(item => !item.equals(data.userId)); 
                if(findFriendExisted === undefined){
                    userSendRequest.friends.push(data.userId);
                }
            }

            const requestAddFriendUpdated =  await User.findByIdAndUpdate({_id:id},userSendRequest,{
                new:true
            });


            const userReceiveRequest  = await User.findById({_id:data.userId}); 

            if(userReceiveRequest){
                const requestExisted =  userReceiveRequest.requestAddFriendFromUser.find(item => item.equals(id));
                if(requestExisted !== undefined){                  
                    userReceiveRequest.requestAddFriendFromUser = userReceiveRequest.requestAddFriendFromUser.filter(item => !item .equals(id));              
                }

                const findFriendExisted = userReceiveRequest.friends.find(item => item.equals(id)); 
                if(findFriendExisted === undefined){
                    userReceiveRequest.friends.push(id);
                }
            }


            const requestAddFriendFromUserUpdated =  await User.findByIdAndUpdate({_id:data.userId},userReceiveRequest,{
                new:true
            });



           return  {
                requestAddFriend:requestAddFriendUpdated.requestAddFriend,
                friends:requestAddFriendUpdated.friends
           };
            
        } catch (error) {
            throw error;
        }
    },


    unAddFriend: async(data,id)=>{
        try {
            const userSendRequest = await User.findById({_id:id});
            if(userSendRequest){      
                    userSendRequest.requestAddFriend = userSendRequest.requestAddFriend.filter(item => !item.equals(data.userId));                  
                }

            const requestAddFriendUpdated =  await User.findByIdAndUpdate({_id:id},userSendRequest,{
                new:true
            });

            const userRecieveRequest = await User.findById({_id:data.userId}); 
            if(userRecieveRequest){              
                userRecieveRequest.requestAddFriendFromUser = userRecieveRequest.requestAddFriendFromUser.filter(item => !item.equals(id));               
            }

            const requestAddFriendFromUserUpdated = await User.findByIdAndUpdate({_id:data.userId},userRecieveRequest,{
                new:true
            });

            if(data.type !== undefined && data.type === 2){
                return {
                    type:2,
                    requestAddFriend:requestAddFriendUpdated.requestAddFriendFromUser
                }
            }

            return requestAddFriendFromUserUpdated.requestAddFriendFromUser
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    delete: async(id)=>{
        try {
            await User.findByIdAndDelete(id);
            return 1;
        } catch (error) {
            throw error;
        }
    },
}