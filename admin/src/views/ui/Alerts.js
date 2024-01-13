import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getNotifiList,updateNotifiList,setIsSuccess} from '../../store/slice/notificationSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ui.scss'

import {
  Alert,
  UncontrolledAlert,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import moment from 'moment'
import 'moment/locale/vi';
const Alerts = () => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch(); 
  const {notifiList,isSuccess,successMessage} = useSelector(state => state.notification)
  const {user} = useSelector(state => state.user);
  const onDismiss = () => {
    setVisible(false);
  };

  const handleSetChecked = (value)=>{
    dispatch(updateNotifiList(value)); 
  }

  if(isSuccess){
    toast.success(successMessage)
    dispatch(setIsSuccess(false)); 
  }

  useEffect(()=>{
    dispatch(getNotifiList(user?.data._id)); 
  },[])

  return (
    <div>
      <ToastContainer/>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Thông báo tài khoản
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiList.length > 0 && notifiList.filter(item => item.notifiType === 'CREATE_ACCOUNT').map(item =>{
                return (
                <Alert style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} color="light">
                  <div className="notifi-wrap">
                    
                    <img src={item?.fromUser?.avatar} alt="" />
                    
                    <div className="info-user">
                      <span >{item?.fromUser?._id?.userName} <span>{item.content}</span></span>
                      <span>{moment(item?.createdAt).calendar()}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <input checked = {item.isReaded} onChange={()=> handleSetChecked(item._id)} title="Đánh dấu đã đọc" style={{cursor:'pointer',width:16,height:16,marginRight:10}} type="checkbox" />  
                   <div className={item.isReaded === true ?'new checked':'new'}></div>
                  </div>
                </Alert>
                )
              })
            }     
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-bell me-2"> </i>
          Thông báo bài viết
        </CardTitle>
        <CardBody className="">
          <div className="mt-3">
            {
              notifiList.length > 0 && notifiList.filter(item => item.notifiType === 'CREATE_POST').map(item =>{
                return (
                <Alert style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} color="light">
                  <div className="notifi-wrap">
                    
                    <img src={item?.fromUser?.avatar} alt="" />
                    
                    <div className="info-user">
                      <span >{item?.fromUser?._id?.userName} <span>{item?.content}</span></span>
                      <span>{moment(item?.createdAt).calendar()}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <input checked = {item.isReaded} onChange={()=> handleSetChecked(item._id)} title="Đánh dấu đã đọc" style={{cursor:'pointer',width:16,height:16,marginRight:10}} type="checkbox" />  
                   <div className={item.isReaded === true ?'new checked':'new'}></div>
                  </div>
                </Alert>
                )
              })
            }       
          </div>
        </CardBody>
      </Card>
      </div>
  )
};

export default Alerts;
