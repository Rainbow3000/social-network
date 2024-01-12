
import './App.scss';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Profile from './pages/profile/Profile';
import PostAction from './components/postAction/PostAction';
import Chat from './pages/chat/Chat'
import Popup from './components/popup/Popup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Rightbar from './components/rightbar/Rightbar';
import Community from './pages/community/Community';
import Auth from './pages/auth/Auth';
import Setting from './pages/setting/Setting';
import Notification from './pages/notification/Notification';
import {createInstanceSocket} from '../src/utils/socket'
import { useEffect,useRef } from 'react';
import {getNotificationByUser} from './store/slice/notificationSlice'
import {getUserInfo,setUserActive,getUserDob} from './store/slice/userSlice'
import {addNotifi} from '../src/store/slice/notificationSlice'
import {addChatCreated,setCallIdList} from '../src/store/slice/chatSlice'
import HashLoader from 'react-spinners/HashLoader'
import VideoCall from './components/videoCall/VideoCall';
import { Peer } from "peerjs";

function App() {

  const dispatch = useDispatch(); 
  const {user,activeList} = useSelector(state => state.user); 
  const {isShowOverlay} = useSelector(state => state.app); 
  const {isShowCallLayout} = useSelector(state => state.chat); 
  const socket = useRef(); 
  const peerRef = useRef(); 
  const navigate = useNavigate(); 




  useEffect(()=>{


    if(user === null){
      navigate('/auth')
      return;
    }

    // const peer = new Peer();
    // peerRef.current = peer; 

    // if(peerRef.current){
    //   peerRef.current.on('open',(id)=>{
    //     if(socket.current){            
    //         const data = {
    //             userId:user?.data._id,
    //             callId:id
    //         }
    //         socket.current.emit('user-call-id',data); 
    //     }
    // })
    // }

    if(activeList.find(item => item !== user.data._id) === undefined){
        const newActiveList = [...activeList,user.data._id]; 
        dispatch(setUserActive(newActiveList)); 
    }

    socket.current = createInstanceSocket();
    if(socket.current){
      socket.current.on('connect', () => {
         socket.current.emit('user-connected',user?.data?._id); 
      });


      socket.current.on('user-online',(data)=>{
            dispatch(setUserActive(data));         
      })

      socket.current.on('notifi-add-friend-single-user',(notifi)=>{
        dispatch(addNotifi(notifi));
     })
     socket.current.on('notifi-accept-add-friend-single-user',(notifi)=>{
         dispatch(addNotifi(notifi));
      })

      socket.current.on('receive-message-single-user',(msg)=>{
        dispatch(addChatCreated(msg));
     })   

     
    }
    
    dispatch(getUserDob(user?.data?._id))
    dispatch(getNotificationByUser(user?.data?._id)); 

  },[user])
  return (
    <div id="app">
      {/* {
        isShowCallLayout === true && (
          <VideoCall/>
        )
      } */}

    <VideoCall/>
      
      {
        isShowOverlay === true && (
          <div className='overlay'>       
            <HashLoader color="#36d7b7" />
          </div>
        )
      }
            {
              user !== null &&  (
                <div className="app-left">
                  <Sidebar/>
                </div>
              )
            }
            <div className="app-center">
              {
                user !== null && (
                  <Header/>           
                )
              }
                  <Routes>
                    <Route path=''  element={<Home/>} />
                    <Route path='/profile/:id'  element={<Profile/>} />
                    <Route path='/chat'  element={<Chat/>} />
                    <Route path='/community'  element={<Community/>} />
                    <Route path='/setting'  element={<Setting/>} />               
                    <Route path='/notification'  element={<Notification/>} />  
                    <Route path='/auth'  element={<Auth/>} />             
                 </Routes>
            </div>
    </div>
  );
}

export default App;
