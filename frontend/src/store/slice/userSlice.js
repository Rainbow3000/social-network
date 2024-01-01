import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _publicRequest } from '../../requestMethod'
import {createInstanceSocket} from '../../utils/socket' 

const socket = createInstanceSocket(); 

export const userRegister = createAsyncThunk(
  'users/register',
  async (data) => {
    try {
      const response = await _publicRequest.post('account/register',data); 
      return response.data
    } catch (error) { 
        throw error?.response?.data
    }
  }
)

export const userLogin = createAsyncThunk(
  'users/login',
  async (data) => {
    const response = await _publicRequest.post('account/login',data); 
    return response.data
  }
)

export const userAddFriend = createAsyncThunk(
  'users/addFriend',
  async (data) => {
    const {id,userData} = data; 
    const response = await _publicRequest.put(`user/friend/${id}`,userData); 
    return response.data
  }
)


export const userAcceptAddFriend = createAsyncThunk(
  'users/acceptAddFriend',
  async (data) => {
    const {id,userData} = data; 
    const response = await _publicRequest.put(`user/friend/accept/${id}`,userData); 
    return response.data
  }
)



export const userCancelAddFriend = createAsyncThunk(
  'users/cancelAddFriend',
  async (data) => {
    const {id,userData} = data; 
    const response = await _publicRequest.put(`user/unfriend/${id}`,userData); 
    return response.data
  }
)




export const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (userId) => {
    const response = await _publicRequest.get(`user/${userId}`); 
    return response.data
  }
)

export const updateUserInfo = createAsyncThunk(
  'users/updateUserInfo',
  async (data) => {
    const {userId,userData} = data; 
    const response = await _publicRequest.put(`user/${userId}`,userData); 
    return response.data
  }
)


const userState = {
  isShowLoginForm:false,
  typePopupForm:1,
  isLoading:false,
  isError:false,
  user: JSON.parse(localStorage.getItem('user'))  || null,
  userInfo:null,
  error:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState:userState,
  reducers: {
    showLoginForm : (state,action)=>{
      state.isShowLoginForm = true; 
      state.typePopupForm = action.payload
    },
    hiddenLoginForm:(state)=>{
        state.isShowLoginForm = false; 
    },
    setTypePopupForm:(state,action)=>{
        state.typePopupForm = action.payload;
    },
    userLogout:(state,action)=>{
        state.user = null; 
        localStorage.removeItem('user'); 
    }
  },

  extraReducers: (builder) => {


    builder.addCase(userCancelAddFriend.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(userCancelAddFriend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      if(action.payload.data.type !== undefined && action.payload.data.type === 2){
        state.userInfo.requestAddFriend = action.payload.data.requestAddFriend;
        state.userInfo.friends = action.payload.data.friends;
        return;
      }
      state.userInfo.requestAddFriendFromUser = action.payload.data.requestAddFriendFromUser;
      state.userInfo.friends = action.payload.data.friends
    })
    builder.addCase(userCancelAddFriend.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })


    builder.addCase(userAcceptAddFriend.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(userAcceptAddFriend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.userInfo.friends = action.payload.data.friends;
      state.userInfo.requestAddFriend = action.payload.data.requestAddFriend;
    })
    builder.addCase(userAcceptAddFriend.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })




    builder.addCase(userAddFriend.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(userAddFriend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.userInfo.requestAddFriendFromUser = action.payload.data;

    })
    builder.addCase(userAddFriend.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })

    builder.addCase(updateUserInfo.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.userInfo = action.payload.data; 
      state.user.data.avatar = action.payload.data.avatar; 
      localStorage.removeItem('user'); 
      localStorage.setItem('user',JSON.stringify(state.user)); 
    })
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })


    builder.addCase(userRegister.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.user = action.payload; 
      localStorage.setItem('user',JSON.stringify((state.user))); 
    })
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isError = true;
      state.user = null;
      state.error = action.error;
      state.isLoading = false; 
    })

    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.user = action.payload; 
      localStorage.setItem('user',JSON.stringify((state.user))); 
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload
      state.isLoading = false; 
    })


    builder.addCase(getUserInfo.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false; 
      state.userInfo = action.payload.data; 
    })
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false; 
    })
  },
})


export const { showLoginForm,hiddenLoginForm,setTypePopupForm,userLogout} = userSlice.actions

export default userSlice.reducer