import React from 'react'
import { PiNotePencilLight } from "react-icons/pi";
import './header.scss'
import { Link } from 'react-router-dom';
import {showOverlay} from '../../store/slice/appSlice'
import {showCreatePost} from '../../store/slice/postSlice'
import {showLoginForm, userLogout} from '../../store/slice/userSlice'
import { CiLogout } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";
import {useDispatch,useSelector} from 'react-redux'
const Header = () => {
  const dispatch = useDispatch(); 

  const {user} = useSelector(state => state.user); 

  const handleClick = ()=>{
    dispatch(showOverlay());
    dispatch(showCreatePost());
  }
  const handleShowLoginForm = (type)=>{
    dispatch(showLoginForm(type)); 
    dispatch(showOverlay());
  }

  const handleLogoutForm = ()=>{
    dispatch(userLogout())
  }
  return (
    <div className='header-container'>
          {/* <ul className='header-action left'>
            <Link className='link' to="/">
              <li>Bảng tin</li>
            </Link>
            <li>Video</li>
          </ul>
          <ul className='header-action right'>
          {
            (user === null || user === undefined) && (
              <>
                <li onClick={()=>handleShowLoginForm(1)}>Đăng Nhập</li>
                <li onClick={()=>handleShowLoginForm(2)}>Đăng Ký</li>
              </>
            )
          }
          {
            (user !== null && user !== undefined) && (
              <>
              <li className='user-nav'>
                  <img src={user?.data?.avatar} alt="" />
                  <span>{user?.data?.userName}</span>
              </li>
              <li onClick={handleLogoutForm}>Thoát<CiLogout/></li>
              <li><button onClick={handleClick} className='header-btn'><PiNotePencilLight/> &nbsp; TẠO TIN</button></li>
              </>
            )
          }
          </ul> */}

          <div className='header-input'>
            <div className='search-icon'>
                <BiSearch/>
            </div>
            <input type="text" placeholder='Hôm nay bạn tìm gì ...'/>
          </div>
          <div className='header-user'>
            <span>{user.data?.userName}</span>
            <img src={user.data?.avatar} alt="" />
          </div>
    </div>
  )
}

export default Header