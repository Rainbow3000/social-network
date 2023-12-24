
import './App.scss';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Profile from './pages/profile/Profile';
import PostAction from './components/postAction/PostAction';
import Chat from './pages/chat/Chat'
import Popup from './components/popup/Popup';
import { Routes, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Rightbar from './components/rightbar/Rightbar';
import Community from './pages/community/Community';
import Auth from './pages/auth/Auth';
function App() {
  const {isShowOverlay} = useSelector(state=> state.app);
  const {isShowCreatePost} = useSelector(state=> state.post);
  const {isShowLoginForm} = useSelector(state => state.user); 
  const user = false; 
  return (
    <div id="app">
      <Routes>
{/* 
      {
        isShowLoginForm && (
          <Popup/>
        )
      }

      {
        isShowCreatePost && (
          <PostAction/>
        )
      }

      {
        isShowOverlay && (
          <div className="overlay"></div>
        )
      } */}

      {

        user === true ? (
          <>
            <div className="app-left">
              <Sidebar/>
            </div>
            <div className="app-center">
              <Header/>
                  <Route path=''  element={<Home/>} />
                  <Route path='/profile/:id'  element={<Profile/>} />
                  <Route path='/chat'  element={<Chat/>} />
                  <Route path='/community'  element={<Community/>} />
                 
            </div>
          </>

        ):(
          <>
            <Route path='/auth'  element={<Auth/>} />
          </>
        )
      }
      </Routes>
    </div>
  );
}

export default App;
