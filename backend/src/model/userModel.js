const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    _id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account", 
      required: true
    },
    avatar:{
      type:String,
      required:[true,"Ảnh người dùng phải được cung cấp"]

    },
    follower:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'User'
    },
    subscribe:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'User'
    },
    friend:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'User'
    },
    dob:{
        type:String
    },
    address:{
        type:String
    },
    education:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    status: {
      type:Number,
      required:true,
      default:1,
    },

  },{timestamps:true})


module.exports =  mongoose.model('User', userSchema);


