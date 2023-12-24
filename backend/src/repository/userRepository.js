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
    delete: async(id)=>{
        try {
            await User.findByIdAndDelete(id);
            return 1;
        } catch (error) {
            throw error;
        }
    },
}