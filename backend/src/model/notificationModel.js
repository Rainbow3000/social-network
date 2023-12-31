const mongoose = require('mongoose')
const validateEmail = require('../utils/validateEmail')
const notificationSchema = new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    content:{
        type:String
    },
    status: {
      type:Number,
      required:true,
      default:1,
    },

  },{timestamps:true})


module.exports =  mongoose.model('Notification', notificationSchema);


