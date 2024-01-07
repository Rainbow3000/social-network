import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'

export const getUserList = createAsyncThunk(
    'user/getUserList',
     async () => {
      const response = await _userRequest.get('user'); 
      return response.data
    }
  )
  
const statState = {
  user:[]
}

export const statSlice = createSlice({
  name: 'stat',
  initialState:statState,
  reducers: {
  
  },

  extraReducers:(builder)=>{

    builder.addCase(getUserList.pending, (state, action) => {
      state.isLoading = true; 
      state.isSuccess = false;
    })
    builder.addCase(getUserList.fulfilled,(state, action) => {
      state.isLoading = false;
      state.error = null; 
      state.isError = false;
      state.user = action.payload.data; 
    })
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload;
      state.isLoading = false;
    })
  }


})


export const {} = statSlice.actions

export default statSlice.reducer