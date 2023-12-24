import React, { useRef, useState } from 'react'
import './auth.scss'
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { BsGenderMale } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
const Auth = () => {

  const dateInputRef = useRef(); 
  const [formState,setFormState] = useState(1);
  const [dob,setDob] = useState(null);
  const handleClick = ()=>{
    dateInputRef.current.showPicker();
  }

  const handleChangeStateForm = (state)=>{
    setFormState(state);
  }

  return (
    <div className='auth-container'> 
        <div className="main">
            <div className="title">
                <span>K2 Meet !</span>
                <span>Tạo tài khoản để tiếp tục và kết nối với những người dùng khác</span>
            </div>
            <div className="form-container">
                <div className={formState !== 1 ? "form-slice active":"form-slice"}>
                    <div className='form-wrapper'>
                        <form action="">
                            <div className='input-item'>
                                <MdAlternateEmail className='icon'/>
                                <input type="text" placeholder='Email' />
                            </div>
                            <div className='input-item'>
                                <FaRegUser className='icon'/>
                                <input type="text" placeholder='Tên hiển thị' />
                            </div>
                            <div className='input-item'>
                                <FiLock className='icon'/>
                                <input type="password" placeholder='Mật khẩu' />
                                <FaRegEyeSlash className='icon'/>
                            </div>
                            <div className='input-wrapper'>
                                <div className='input-item'>
                                    <input ref={dateInputRef} id='date' type="date" onChange={e => setDob(e.target.value)}/>     
                                    <div className='input-date'>
                                        <MdOutlineDateRange className='icon' onClick={handleClick}/>
                                        &nbsp;
                                        &nbsp;
                                        <span>{dob !== null ? dob.split('-').reverse().join('-') : 'Sinh nhật'}</span>
                                    </div>                  
                                </div>
                                <div className='input-item'>
                                    <BsGenderMale className='gender-icon'/>
                                    <input type="radio" name='gender' />
                                    <label className='gender-label' htmlFor="">Nam</label>
                                    <input type="radio" name='gender' />
                                    <label className='gender-label' htmlFor="">Nữ</label>
                                </div>
                            </div>
                            <div className='form-btn'>
                                <span >Đăng Ký</span>
                            </div>
                            <div className='login-link'>
                                <span>Bạn đã có tài khoản ?</span>
                                &nbsp;
                                &nbsp;
                                <span onClick={()=>handleChangeStateForm(2)} >Đăng nhập</span>
                            </div>
                        </form>
                        
                    </div>
                    <div className='form-wrapper'>
                        <form action="">
                            <div className='input-item'>
                                <MdAlternateEmail className='icon'/>
                                <input type="text" placeholder='Email' />
                            </div>
                            <div className='input-item'>
                                <FiLock className='icon'/>
                                <input type="password" placeholder='Mật khẩu' />
                                <FaRegEyeSlash className='icon'/>
                            </div>
                            <div className='input-wrapper'>
                                <div className='forget-pass'>
                                    <span>Quên mật khẩu ?</span>
                                    <span>Cấp lại mật khẩu</span>
                                </div>
                            </div>
                            <div className='form-btn'>
                                <span>Đăng Nhập</span>
                            </div>
                            <div className='login-link'>
                                <span>Bạn chưa có tài khoản ?</span>
                                &nbsp;
                                &nbsp;
                                <span onClick={()=>handleChangeStateForm(1)}>Đăng ký</span>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth