import React from 'react'
import { Card, CardBody, CardTitle, CardImg, Table, Row,Col } from "reactstrap";

import {useSelector,useDispatch} from 'react-redux'
import {getUserList,deleteUser,setIsSuccess,blockAccount} from '../../store/slice/userSlice'
import {getDenounceList,lockPost,confirmOffence} from '../../store/slice/postSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLockClosedOutline } from "react-icons/io5";
import { useEffect } from "react";
import './denounce.scss'
import moment from 'moment'
import 'moment/locale/vi';
import { useState } from 'react';
import Post from '../../components/dashboard/Post';
const Denounce = () => {

    const {userList,isSuccess,successMessage} = useSelector(state => state.user); 
    const {denounceList} = useSelector(state => state.post); 
    const [viewDetails,setViewDetails] = useState(false); 
    const [detailsDenouncePost,setDetailsDenouncePost] = useState(null); 

    const dispatch = useDispatch()
    const handleDeleteUser = (userId)=>{
      dispatch(deleteUser(userId)); 
    }
  
  
    if(isSuccess){
      dispatch(getUserList()); 
      dispatch(setIsSuccess(false))
      toast.success(successMessage)
    }

    const handleSetChecked = (value,item)=>{
        const userList = item?.denounce.map(item => item.user._id._id); 
        if(value === true){
           dispatch(confirmOffence({postId:item._id,userList}))
        }
    }
  
    useEffect(()=>{
      dispatch(getDenounceList()); 
    },[]) 
  return (
    <div>
      {
        viewDetails === false ? (
          <>
            <ToastContainer/>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh sách bài viết bị tố cáo </CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin người tạo</th>
                <th>Ngày tạo bài viết</th>
                <th>Số đơn tố cáo</th>     
                <th>Trạng thái</th>  
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {denounceList?.length > 0 && denounceList?.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                        <img
                            src={tdata?.user?.avatar}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0">{tdata?.user?._id?.userName}</h6>
                            <span className="text-muted">{tdata?.user?._id?.email}</span>
                          </div>
                    </div>
                  </td>
                  <td style={{width:'25%'}}>
                            <span>{tdata?.createdDate?.split('+')[0]?.split('T')[0].split('-').reverse().join('/')}</span>
                            <span> - {tdata?.createdDate?.split('+')[0]?.split('T')[1]}</span>
                  </td>
                  <td>{tdata.denounce?.length}</td>
                  <td>
                    {
                      tdata.status === 1 && (
                        <span title="Đang hoạt động" className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )
                    }

                    {
                      tdata.status === -1 && (
                        <span title="Ngưng hoạt động" className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      )
                    }
                  </td>
                 
                  <td>

                    <div style={{display:'flex',alignItems:'center'}}>
                        <div className='icon-wrapper' title="Xem chi tiết"  onClick={()=> {
                          setDetailsDenouncePost(tdata)
                          setViewDetails(true)
                        }}>
                          <i class="bi bi-eye text-primary"></i>
                        </div>

                        <div style={{marginLeft:10, display:'flex',justifyContent:'center',alignItems:'center',padding:5}} className='icon-wrapper' title="Xác nhận">
                           <input onChange={(e)=> handleSetChecked(e.target.checked, tdata)} type="checkbox" />
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
            <Row style={{display:'flex'}}>
               <CardTitle tag="h5"> <i style={{cursor:'pointer'}} onClick={()=>setViewDetails(false)} class="bi bi-arrow-left"></i> Chi tiết đơn tố cáo </CardTitle>
               <div style={{display:'flex',alignItems:'flex-start'}}>        
                      <div style={{flex:1}}>
                      <Post post={detailsDenouncePost}/>
                      </div>
                
                    <Card style={{flex:2}} className='info-denounce'>
                    <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Bảng thống kê tố cáo
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thông tin người tố cáo</th>
                  <th>Lý do tố cáo</th>
                </tr>
              </thead>
              <tbody>

                {
                  detailsDenouncePost?.denounce.map((item,index) =>{
                    return (

                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <div style={{display:'flex',alignContent:'center'}}>
                            <img className='denounce-img' width={60} height={60} src={item?.user?.avatar} alt="" />
                            <h6 style={{marginLeft:10, display:'flex',alignItems:'center',marginBottom:0}}>{item?.user?._id?.userName}</h6>
                          </div>
                        </td>
                        <td>
                            <ul>
                              {
                                item.denounceContent?.map(value =>{
                                  return (
                                    <li>{value?.split('.')[1]}</li>
                                  )
                                })
                              }  
                            </ul>  
                        </td>        
                      </tr>
                     
                    )
                  })
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
                    </Card>
               </div>
            </Row>
        )
      }
    </div>
  )
}

export default Denounce