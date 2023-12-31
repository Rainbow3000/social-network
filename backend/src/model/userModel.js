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
    coverAvatar:{
      type:String,
    },
    gender:{
      type:String,
      required:[true,"Giới tính người dùng phải được cung cấp"],
    },
    dob:{
      type:String,
      required:[true,"Ngày sinh người dùng phải được cung cấp"],
    },
    address:{
        type:String
    },
    career:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    facebookLink:{
        type:String
    },
    twitterLink:{
      type:String
    },
    instagramLink:{
      type:String
    },
    LinkedInLink:{
    type:String
  },

  requestAddFriend:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User'
  },

  requestAddFriendFromUser:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User'
  },

  friends:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:'User'
  },
  blocking:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
  },
  followers:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
  },
  followings:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User'
  },
  status: {
    type:Number,
    required:true,
    default:1,
  },

  },{timestamps:true})


module.exports =  mongoose.model('User', userSchema);


