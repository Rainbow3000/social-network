import React from 'react'
import './setting.scss'
import { IoPersonOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { FiLock } from "react-icons/fi";
import { MdOutlineHistory } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import EditProfile from '../../components/editProfile/EditProfile';
const Setting = () => {
  return (
    <div className='setting-container'>
        <div className='setting-list'>
            <ul>
                <li className='active'><IoPersonOutline/>&nbsp;&nbsp;&nbsp;Cập nhật hồ sơ <MdArrowForwardIos className='arrow-icon'/></li>
                <li><MdBlock/>&nbsp;&nbsp;&nbsp;Đã chặn</li>
                <li><GoBell/>&nbsp;&nbsp;&nbsp;Thông báo</li>
                <li><FiLock/>&nbsp;&nbsp;&nbsp;Tài khoản</li>
                <li><MdOutlineHistory/>&nbsp;&nbsp;&nbsp;Lịch sử hoạt động</li>
            </ul>
        </div>

        <div className='setting-content'>
            <EditProfile/>
        </div>
    </div>
  )
}

export default Setting