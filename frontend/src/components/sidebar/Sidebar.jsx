import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.scss'
import { useSelector } from 'react-redux';
import { BiCategory } from "react-icons/bi";
import { BiBell } from "react-icons/bi";
import { BiMessage } from "react-icons/bi";
import { FaWpexplorer } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";
const Sidebar = () => {
  const {user} = useSelector(state => state.user); 
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
              <Link className='link' to={user?.data ? `/profile/${user.data._id}`:`/profile/un-auth`}>
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
              <Link className='link' to={user?.data ? `/profile/${user.data._id}`:`/profile/un-auth`}>
                <IoSettingsOutline/>
                 <span>&nbsp;&nbsp; Cài đặt</span>
              </Link>
            </li>
           
        </ul>
    </div>
  )
}

export default Sidebar