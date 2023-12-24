import React from 'react'
import './community.scss'
import Rightbar from '../../components/rightbar/Rightbar'
import Recommend from '../../components/recommend/Recommend'
const Community = () => {
  return (
    <div className='community-container'>
        <div className='community-wrapper'>
            <div className="community-top">
                <div className='top-btn'><span>52,888 Người theo dõi</span></div>
                <div className='top-btn'><span>52,888 Đang theo dõi</span></div>
                <div className='top-btn'><span>Người dùng khác</span></div>
            </div>

            <div className="community-center">
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
                <Recommend isHiddenTop={true}/>
            </div>


        </div>
        <div className='rightbar'>
            <Rightbar/>
        </div>
    </div>
  )
}

export default Community