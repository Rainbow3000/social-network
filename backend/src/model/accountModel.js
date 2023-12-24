const mongoose = require('mongoose')
const validateEmail = require('../utils/validateEmail')
const accountSchema = new mongoose.Schema(
  {
    userName: {
        type:String,
        required:[true,"Tên người dùng không được để trống"],
        minLength:[2,"Tên người dùng phải lớn hơn 1 ký tự"],
        maxLength:[50,"Tên người dùng không được quá 50 ký tự"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true,'Email không được để trống'],
        validate: [validateEmail, 'Email không đúng định dạng'],
    },
    password:{
      type:String,
      required:true,
      min:[2,"Tên người dùng phải lớn hơn 1 ký tự"],
      max:[50,"Tên người dùng không được quá 50 ký tự"]
    },
    role:{
      type:String,
      required:true,
      default:"USER"
    },
    status: {
      type:Number,
      required:true,
      default:1,
    },

  },{timestamps:true})


module.exports =  mongoose.model('Account', accountSchema);


