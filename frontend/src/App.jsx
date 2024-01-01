
import './App.scss';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Profile from './pages/profile/Profile';
import PostAction from './components/postAction/PostAction';
import Chat from './pages/chat/Chat'
import Popup from './components/popup/Popup';
import { Routes, Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Rightbar from './components/rightbar/Rightbar';
import Community from './pages/community/Community';
import Auth from './pages/auth/Auth';
import Setting from './pages/setting/Setting';
import Notification from './pages/notification/Notification';
import {createInstanceSocket} from '../src/utils/socket'
import { useEffect,useRef } from 'react';
import {getNotificationByUser} from './store/slice/notificationSlice'
import {getUserInfo} from './store/slice/userSlice'
import {addNotifi} from '../src/store/slice/notificationSlice'
function App() {
  const {isShowOverlay} = useSelector(state=> state.app);
  const {isShowCreatePost} = useSelector(state=> state.post);
  const {isShowLoginForm} = useSelector(state => state.user); 
  const dispatch = useDispatch(); 
  const {user} = useSelector(state => state.user); 
  const socket = useRef(); 
  useEffect(()=>{
    socket.current = createInstanceSocket();
    if(socket.current){
      socket.current.on("connect", () => {
         socket.current.emit('user-connected',user.data._id); 
      });

      socket.current.on('notifi-add-friend-single-user',(notifi)=>{
        dispatch(addNotifi(notifi));
     })
     socket.current.on('notifi-accept-add-friend-single-user',(notifi)=>{
         dispatch(addNotifi(notifi));
      })


    }

    dispatch(getNotificationByUser(user.data._id)); 
  },[])
  return (
    <div id="app">
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
