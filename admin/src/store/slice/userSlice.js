import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'

export const getUserList = createAsyncThunk(
    'user/getUserList',
     async () => {
      const response = await _userRequest.get('user'); 
      return response.data
    }
  )

  
export const userLogin = createAsyncThunk(
  'users/login',
  async (data) => {
    try{
      const response = await _userRequest.post('account/login',data); 
      return response.data
    }catch(error){
      throw error?.response?.data
    }
  }
)

  
export const blockAccount = createAsyncThunk(
  'users/block',
  async (data) => {
    const {id} = data; 
    try{
      const response = await _userRequest.put(`user/blockbyadmin/${id}`); 
      return response.data
    }catch(error){
      throw error?.response?.data
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    try{
      const response = await _userRequest.delete(`user/${userId}`); 
      return response.data
    }catch(error){
      throw error?.response?.data
    }
  }
)

export const recoverPassword = createAsyncThunk(
  'users/password/reset',
  async (data) => {
    try {
      const response = await _userRequest.post('account/password/reset',data); 
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }
)

export const updateUserInfo = createAsyncThunk(
  'users/updateUserInfo',
  async (data) => {
    const {userId,userData} = data; 
    const response = await _userRequest.put(`user/${userId}`,userData); 
    return response.data
  }
)


export const getUserInfo = createAsyncThunk(
  'users/getUserInfo',
  async (userId) => {
    const response = await _userRequest.get(`user/${userId}`); 
    return response.data
  }
)
  
const userState = {
  isShowLoginForm:false,
  typePopupForm:1,
  isLoading:false,
  isError:false,
  userList:[],
  user: JSON.parse(localStorage.getItem('user'))  || null,
  userInfo:null,
  error:null,
  isSuccess:false,
  successMessage:"",
  isRecoverPassSuccess:false,
  activeList: [],
  userDob:[],
  blockingUser:[],
  
}

export const userSlice = createSlice({
  name: 'user',
  initialState:userState,
  reducers: {
    userLogout:(state,action)=>{
      state.user = null; 
      localStorage.removeItem('user');
      localStorage.clear();  
    },
    setUserActive:(state,action)=>{
      state.activeList = action.payload;
     },
    setIsSuccess:(state,action)=>{
      state.isSuccess = action.payload; 
    }
  },

  extraReducers:(builder)=>{

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

    builder.addCase(deleteUser.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.isSuccess = true; 
      state.successMessage = action.payload.message
    })

    builder.addCase(blockAccount.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.isSuccess = true; 
      state.successMessage = action.payload.message
    })

    builder.addCase(getUserList.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getUserList.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.userList = action.payload.data; 
    })
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
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
      state.error = action.error
      state.isLoading = false; 
    })

    builder.addCase(recoverPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false; 
      state.isRecoverPassSuccess = true; 
    })

    builder.addCase(recoverPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error; 
      state.isSuccess = false; 
      state.isRecoverPassSuccess = false; 
    })

  }
})


export const {userLogout,setIsSuccess,setUserActive} = userSlice.actions

export default userSlice.reducer