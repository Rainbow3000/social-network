import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import moment from 'moment/dist/moment';
import './comment.scss'
import 'moment/dist/locale/vi'
moment.locale('vi');
const Comment = ({comment,handleSetReplyComment,index,handleShowCommentChild}) => {
  return (
    <div className='post-comment'>
    <div className='post-comment-item'>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSGfpQ3m-QWiXgCBJJbrcUFdNdWAhj7rcUqjeNUC6eKcXZDAtWm" alt="" />
        <div className='comment-content'>
            <div className="comment-content-main">
                <div className='comment-top'>
                    <span className='user-name'>{comment.user?._id?.userName}</span>
                    <span className='time-comment'><IoTimeOutline/>&nbsp;{moment(comment.createdDate).startOf('hour').fromNow()}</span>
                </div>
                <div>
                    <span className='user-comment'>{comment.content}</span>
                </div>
            </div>

            <div className='user-action'>
                <div>
                    <span>Thích</span>
                    <span onClick={()=>handleSetReplyComment(`${comment.user?._id?.userName} `,comment._id)}>Phản hồi</span>
                    <span onClick={()=>handleShowCommentChild(index)} className='child-comment-num'>{comment.children?.length} Bình luận</span>
                </div>
                <span>Báo cáo</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default Comment