import React from 'react'
import './recommend.scss'
import { RiFacebookBoxLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { PiLinkedinLogoBold } from "react-icons/pi";
const Recommend = ({isHiddenTop}) => {
  return (
    <div className="right-recommend">
                  <div className={isHiddenTop === true ? 'top hidden':'top'}>
                    <span>Đề xuất</span>
                    <span>Xem thêm</span>
                  </div>
                  <div className='center'>           
                      <img src="https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_778" alt="" />            
                      <div className="user-wrapper">
                        <div className='user-name'>
                          <span>Nguyễn Văn A</span>
                          <span>Người đóng góp nổi bật</span>
                          <div className='icon-list'>
                            <span><RiFacebookBoxLine/></span>
                            <span><LuTwitter/></span>
                            <span><FaInstagram/></span>
                            <span><PiLinkedinLogoBold/></span>
                          </div>
                        </div>


                      </div>
                      
                    </div>
                
                  <div className='bottom'>
                    <button>Ẩn</button>
                    <button>Theo dõi</button>
                  </div>
              </div>
  )
}

export default Recommend