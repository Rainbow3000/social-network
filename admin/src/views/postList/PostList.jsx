import React from 'react'
import { Card, CardBody, CardTitle, CardImg, Table, Row } from "reactstrap";
import {useSelector,useDispatch} from 'react-redux'
import {getUserList,deleteUser,setIsSuccess,blockAccount} from '../../store/slice/userSlice'
import {getPostList,resetSuccess} from '../../store/slice/postSlice'
import {getDenounceList,lockPost,deletePost} from '../../store/slice/postSlice'
import { ToastContainer, toast } from 'react-toastify';
import { IoLockClosedOutline } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import './postList.scss'
import moment from 'moment'
import 'moment/locale/vi';
import { useState } from 'react';
import Post from '../../components/dashboard/Post';
const PostList = () => {

    const [singlePost,setSinglePost] = useState(null); 
    const [viewSinglePost,setViewSinglePost] = useState(false); 
    const {denounceList} = useSelector(state => state.post); 
    const {postList,isSuccess,successMessage} = useSelector(state => state.post); 
 
    const dispatch = useDispatch()
    const handleDeletePost = (postId)=>{
      dispatch(deletePost(postId)); 
    }

  
    const handleBlockAccount = (userId)=>{
      dispatch(blockAccount({id:userId})); 
    }
    
  
    if(isSuccess){
      dispatch(getUserList()); 
      dispatch(setIsSuccess(false))
      toast.success(successMessage)
      dispatch(resetSuccess()); 
    }

    const handleLockPost = (postId)=>{
        dispatch(lockPost(postId)); 
    }
  
    useEffect(()=>{
      dispatch(getPostList()); 
    },[]) 
  return (

    <Row style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
      {
        viewSinglePost === false ? (
            <>
              <ToastContainer/>
              <Card>
                <CardBody>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <CardTitle tag="h5">Danh sách các bài viết </CardTitle>
                  <button className="btn btn-success"><i class="bi bi-pencil-square"></i> Tạo bài viết</button>
                  </div>
                  <Table className="no-wrap mt-3 align-middle" responsive borderless>
                    <thead>
                      <tr>
                        <th>Thông tin người tạo</th>
                        <th>Thời gian tạo</th>
                        <th>Loại nội dung</th>
                        <th>Thống kê tương tác</th>       
                        <th>Trạng thái</th>       
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postList?.length > 0 && postList?.map((tdata, index) => (
                      
                        <tr key={index} className="border-top">
                          <td>
                            <div className="d-flex align-items-center p-2">
                                <img
                                    src={tdata.user.avatar}
                                    className="rounded-circle"
                                    alt="avatar"
                                    width="45"
                                    height="45"
                                  />
                                  <div className="ms-3">
                                    <h6 className="mb-0">{tdata.user._id.userName}</h6>
                                    {/* <span className="text-muted">{tdata.user._id.email}</span> */}
                                  </div>
                            </div>
                          </td>
                          <td>
                            <span>{tdata.createdDate?.split('+')[0].split('T')[0].split('-').reverse().join('/')}</span>
                            <span> - {tdata.createdDate?.split('+')[0].split('T')[1]}</span>
                          </td>
                          <td style={{width:'25%'}}>
                            <div  className="d-flex align-items-center p-2 content-type"> 
                            {
                              tdata.content !== "" && (
                                <span>Văn bản &nbsp;</span>
                              )
                            }   

                            {
                                tdata.images?.length > 0 && (
                                  <span>Ảnh &nbsp;</span>
                                )
                            }

                            {
                              tdata.video !== "" && (
                                <span>Video</span>
                              )
                            }
                       
                             
                            </div>
                          </td>
                          <td>
                            <span>{tdata.like.number} Thích</span> | 
                            <span> {tdata.comment.number} Bình luận</span> | 
                            <span> {tdata.share.number} Chia sẻ</span>
                          </td>

                          <td>
                            <span>
                              
                              {tdata.status === 1 && (
                                 <span title="Tài khoản bị khóa" className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                              )}</span>

                              {
                                tdata.status === -1 && (
                                  <span title="Ngưng hoạt động" className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                )
                              }
                          </td>
                        
                          <td>
                            <div style={{display:'flex',alignItems:'center'}}>
                            <div style={{marginRight:10}} className='icon-wrapper' title="Xem chi tiết" onClick={()=> {
                                setSinglePost(tdata)
                                setViewSinglePost(true); 
                              }}>
                                <i class="bi bi-eye text-primary"></i>
                              </div>

                              <div className='icon-wrapper' title="Khóa bài viết" style={{marginRight:10}} onClick={()=>handleLockPost(tdata._id)}>   
                                < IoLockClosedOutline class="bi bi-trash3 text-warning"/>
                              </div>
                              <div className='icon-wrapper' title="Xóa bài viết" onClick={()=> handleDeletePost(tdata._id)}>   
                                <i class="bi bi-trash3 text-danger"></i>
                              </div>

                             
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </>
          ):(
             <Row style={{width:850, height:650}}>                
                <CardTitle tag="h5"> <i style={{cursor:'pointer'}} onClick={()=>setViewSinglePost(false)} class="bi bi-arrow-left"></i> Chi tiết bài viết </CardTitle>
                  <div style={{height:850,height:650}}>

                  <Post post={singlePost} />
                  </div>
                
                
             </Row>
             
          )
      }
    </Row>
  )
}

export default PostList