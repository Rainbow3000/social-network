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


export const getNotificationByUser = createAsyncThunk(
  'notification/getByUser',
  async (userId) => {
    try {
      const response = await _publicRequest.get(`notification/getByUser/${userId}`); 
      return response.data
    } catch (error) { 
        throw error?.response?.data
    }
  }
)



const notificationState = {
  notificationList:[],
  unReadNumber:0,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState:notificationState,
  reducers: {
    addNotifi:(state,action)=>{
      state.notificationList = [action.payload,...state.notificationList];
      state.unReadNumber = state.unReadNumber + 1;
    }
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

    builder.addCase(getNotificationByUser.pending, (state, action) => {
      state.isLoading = true; 
    })
    builder.addCase(getNotificationByUser.fulfilled, (state, action) => {
        state.notificationList = action.payload.data;

        state.unReadNumber = state.notificationList.filter(item => item.isReaded === false).length; 
    })
    builder.addCase(getNotificationByUser.rejected, (state, action) => {
      state.user = null;
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false; 
    })
  },
})


export const { addNotifi } = notificationSlice.actions

export default notificationSlice.reducer