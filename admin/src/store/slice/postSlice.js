import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'



  export const getDenounceList = createAsyncThunk(
    'user/getDenounce',
     async () => {
      const response = await _userRequest.get('post/denounce/getlist'); 
      return response.data
    }
  )

export const getPostList = createAsyncThunk(
    'post/getList',
    async () => {
      try {
        const response = await _userRequest.get('post'); 
        return response.data
      } catch (error) {
        throw error?.response?.data
      }
    }
  )
  
const postState = {
  isLoading:false,
  isError:false,
  isSuccess:false,
  postList:[],
  denounceList:[]
}

export const postSlice = createSlice({
  name: 'user',
  initialState:postState,
  reducers: {
    userLogout:(state,action)=>{
      state.user = null; 
      localStorage.removeItem('user');
      localStorage.clear();  
    },
    setIsSuccess:(state,action)=>{
      state.isSuccess = action.payload; 
    }
  },

  extraReducers:(builder)=>{
    builder.addCase(getPostList.fulfilled,(state, action) => {
        state.isLoading = false;
        state.postList = action.payload.data; 
        state.isError = false;
        state.isSuccess = true; 
    })

    builder.addCase(getDenounceList.fulfilled,(state, action) => {
      state.isLoading = false;
      state.denounceList = action.payload.data; 
      state.isError = false;
      state.isSuccess = true; 
    })
  }


})


export const {userLogout,setIsSuccess} = postSlice.actions

export default postSlice.reducer