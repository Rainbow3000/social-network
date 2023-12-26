const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const _accountRepository = require('../repository/accountRepository')
const _userRepository = require('../repository/userRepository')
const validateError = require('../utils/validateError');
const mongoose = require('mongoose');

module.exports = {
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const account = await _accountRepository.getByEmail(data?.email)
        if (account) {
          const decryptPass = CryptoJS.AES.decrypt(
            account.password,
            process.env.AES_SECRET
          );
          
          const originPass = decryptPass.toString(CryptoJS.enc.Utf8); 
          if (originPass === data.password) {
            const accessToken = jwt.sign(
              { userName: account.userName, isAdmin: account.isAdmin },
              process.env.JWT_TOKEN,
              {
                expiresIn: "1d",
              }
            );
            const { password, ...subInfoUser } = account._doc;
            const _account = { ...subInfoUser, accessToken };
            resolve({
              success:true,
              message:"Đăng nhập thành công",
              statusCode:200,
              data:_account,
          });
          } else {        
            reject({
                success:false,
                message:"Password:Mật khẩu không chính xác",
                statusCode:401,
                data:null,
            });
          }
        } else {
          reject({
            success:false,
            message:"Email:Email không hợp lệ hoặc không tồn tại",
            statusCode:401,
            data:null,
        });
        }
      } catch (error) {
        reject({
            success:false,
            message:null,
            statusCode:500,
            data:null,
            errors:error.message,
        })
    }
    });
  },
  register: async(data) => {
    try {
           const accountExisted =  await _accountRepository.getByEmail(data?.email); 
            if(accountExisted !== null){
                return {
                    success:false,
                    message:"Email:Email đã tồn tại",
                    statusCode:400,
                    data:null              
                 }; 
            }  
            const hashPassword = CryptoJS.AES.encrypt(data.password,process.env.AES_SECRET).toString();
            data.password = hashPassword;
            const _account = await _accountRepository.create(data);
            const {password,..._accountRest} = _account._doc;
            const user = await _userRepository.create({_id:_accountRest._id,avatar:process.env.AVATAR_DEFAULT,dob:data?.dob,gender:data?.gender}); 
            const accessToken = jwt.sign(
              { userName: _accountRest.userName, isAdmin: _accountRest.isAdmin},
              process.env.JWT_TOKEN,
              {
                expiresIn: "1d",
              }
              );
              _accountRest.accessToken = accessToken; 
              _accountRest.avatar = user.avatar; 
              return {
                success:true,
                message:"Đăng ký tài khoản thành công",
                statusCode:201,
                data:_accountRest,
              }     
    } catch (error) {
           
          if(error instanceof mongoose.Error.ValidationError){  
            return {
                success:false,
                statusCode:400,
                data:null,
                message:validateError(error)
            };
          }
          return {
              success:false,
              statusCode:500,
              data:null,
              message:error?.message
          }
    }
},
};