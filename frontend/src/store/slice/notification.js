import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _publicRequest } from '../../requestMethod'


export const createNotification = createAsyncThunk(
  'notification/create',
  async (data) => {
    try {
      const response = await _publicRequest.post('notification',data); 
      return response.data
    } catch (error) { 
        throw error?.response?.data
    }
  }
)


const notificationState = {
  notificationList:[]
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState:notificationState,
  reducers: {
   
  },

  extraReducers: (builder) => {


    builder.addCase(createNotification.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(createNotification.fulfilled, (state, action) => {
        state.notificationList = action.payload.data;
    })
    builder.addCase(createNotification.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })
  },
})


export const { showLoginForm,hiddenLoginForm,setTypePopupForm,userLogout} = notificationSlice.actions

export default notificationSlice.reducer