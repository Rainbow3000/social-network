import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { BiCategory } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import { FaWpexplorer } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
import { MdOutlineLogout } from "react-icons/md";
import {userLogout} from '../../store/slice/userSlice'
const Sidebar = () => {
  const {user} = useSelector(state => state.user); 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const handleLogout = ()=>{
    dispatch(userLogout());
  }

  if(user === null){
    navigate('/auth')
  }
  return (
    <div className='sidebar'>
        <div id='logo'>
            <h1>K2 Meet</h1>
        </div>
        <ul className='sidebar-action-list'>
            <li>
              <Link className='link' to='/'>
                <BiCategory/>
                 <span>&nbsp;&nbsp; Bảng tin</span>
              </Link>
            </li>
            <li>
              <Link className='link' to="/chat">
                <BiMessage/>
                 <span>&nbsp;&nbsp; Tin nhắn</span>
              </Link>
            </li>

            <li>
              <Link className='link' to="/community">
                <TbUsersGroup/>
                 <span>&nbsp;&nbsp; Mọi người</span>
              </Link>
            </li>

            <li>
              <Link className='link' to="/notification">
                <BiBell/>
                 <span>&nbsp;&nbsp; Thông báo</span>
              </Link>
            </li>
            <li>
              <Link className='link' to={user?.data ? `/profile/${user.data._id}`:`/profile/un-auth`}>
                <FaWpexplorer/>
                 <span>&nbsp;&nbsp; Khám phá</span>
              </Link>
            </li>

            <li>
              <Link className='link' to={`/profile/${user?.data._id}`}>
                <RxPerson/>
                 <span>&nbsp;&nbsp; Hồ sơ</span>
              </Link>
            </li>

            <li>
              <Link className='link' to="/setting">
                <IoSettingsOutline/>
                 <span>&nbsp;&nbsp; Cài đặt</span>
              </Link>
            </li>
            
              {
                user !== null && (
                <li>
                    <Link className='link' onClick={handleLogout}>
                      <MdOutlineLogout/>
                      <span>&nbsp;&nbsp; Thoát</span>
                    </Link>
                </li>
                )
              }
           
        </ul>
    </div>
  )
}

export default Sidebar