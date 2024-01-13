import React from 'react'
import { Card, CardBody, CardTitle, CardImg, Table } from "reactstrap";

import {useSelector,useDispatch} from 'react-redux'
import {getUserList,deleteUser,setIsSuccess,blockAccount} from '../../store/slice/userSlice'
import {getDenounceList} from '../../store/slice/postSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from "react";
import './denounce.scss'
import moment from 'moment'
import 'moment/locale/vi';
const Denounce = () => {

    const {userList,isSuccess,successMessage} = useSelector(state => state.user); 
    const {denounceList} = useSelector(state => state.post); 
    console.log(denounceList)
    const dispatch = useDispatch()
    const handleDeleteUser = (userId)=>{
      dispatch(deleteUser(userId)); 
    }
  
    const handleBlockAccount = (userId)=>{
      dispatch(blockAccount({id:userId})); 
    }
  
    if(isSuccess){
      dispatch(getUserList()); 
      dispatch(setIsSuccess(false))
      toast.success(successMessage)
    }
  
    useEffect(()=>{
      dispatch(getDenounceList()); 
    },[]) 
  return (
    <div>
      <ToastContainer/>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Danh sách các bài viết bị tố cáo </CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin bài viết</th>
                <th>Ngày tạo</th>
                <th>Thông tin người tạo</th>
                <th>Số đơn tố cáo</th>       
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {denounceList?.length > 0 && denounceList?.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td style={{width:'25%'}}>
                    <div className="d-flex align-items-center p-2">                   
                      <div className="ms-3">
                        <h6>{tdata.content}</h6>
                      {
                tdata.images?.length === 1 && (
                  <img style={{borderRadius:5}} width={160} alt="Card cap" src={tdata.images[0]} />
                )
                }

              {
                tdata.images?.length > 1 && (
                  <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}} >                 
                          <img style={{margin:3,borderRadius:5,width:160}} src={tdata.images[0]} alt="" />                                       
                  </div>
                )
              }
            {
                    tdata?.images?.length === 0  && tdata.video.trim() !== "" && (
                        <div className='post-video'>
                            <video width="170px"  controls  poster={tdata.thumb} >
                                <source src={tdata.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                

                
            }

            {
                 (tdata?.thumb === undefined || tdata?.thumb === null || tdata.thumb === "") && (
                  tdata?.images?.length === 0  && tdata?.video?.trim() !== "" &&(
                        <div className='post-video'>
                            <video width="220px" height="100%" controls >
                                <source src={tdata.video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                )
            }
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{moment(tdata.createdDate).calendar()}</span>
                  </td>
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
                            <span className="text-muted">{tdata.user._id.email}</span>
                          </div>
                    </div>
                  </td>
                  <td>{tdata.denounce?.length}</td>
                 
                  <td>
                      <div className='icon-wrapper' title="Xem chi tiết"  onClick={()=> handleBlockAccount(tdata._id._id)}>
                         <i class="bi bi-eye"></i>
                      </div>
                     
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Denounce