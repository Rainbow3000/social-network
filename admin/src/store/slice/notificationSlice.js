import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { _userRequest } from '../../requestMethod'



export const getNotifiList = createAsyncThunk(
    'notifi/getList',
    async (userId) => {
      try {
        const response = await _userRequest.get(`notification/getbyuser/${userId}`); 
        return response.data
      } catch (error) {
        throw error?.response?.data
      }
    }
  )

  
export const updateNotifiList = createAsyncThunk(
  'notifi/update',
  async (id) => {
    try {
      const response = await _userRequest.put(`notification/${id}`); 
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }
)

export const createNotifi = createAsyncThunk(
  'notifi/createByAdmin',
  async (data) => {
    try {
      const response = await _userRequest.post(`notification/byadmin`,data); 
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }
)


export const deleteNotifi = createAsyncThunk(
  'notifi/deleteNotifi',
  async (id) => {
    try {
      const response = await _userRequest.delete(`notification/${id}`); 
      return {id,message:response.data.message}
    } catch (error) {
      throw error?.response?.data
    }
  }
)



  
const postState = {
  isLoading:false,
  isError:false,
  isSuccess:false,
  successMessage:false,
  notifiList:[],
}

export const notificationSlice = createSlice({
  name: 'notifi',
  initialState:postState,
  reducers: {
    setIsSuccess:(state,action)=>{
      state.isSuccess = action.payload; 
    },
    addNotifi:(state,action)=>{
        state.notifiList = [action.payload,...state.notifiList];
        state.unReadNumber = state.unReadNumber + 1;
      },
  },

  extraReducers:(builder)=>{

    builder.addCase(updateNotifiList.fulfilled,(state,action) => {
      state.isLoading = false;
      state.notifiList = state.notifiList.map(item =>{
        if(item._id === action.payload.data._id){
        
           item = action.payload.data; 
        }
        return item; 
      })
      state.successMessage = action.payload.message; 
      state.isError = false;
      state.isSuccess = true; 
    })

    builder.addCase(getNotifiList.fulfilled,(state, action) => {
        state.isLoading = false;
        state.notifiList = action.payload.data; 
        state.isError = false;
       
      })

      builder.addCase(createNotifi.fulfilled,(state, action) => {
        state.isLoading = false;
        state.isSuccess = true; 
        state.successMessage = action.payload.message; 
       
      })


      builder.addCase(deleteNotifi.fulfilled,(state, action) => {
        state.isLoading = false;
        state.isSuccess = true; 
        state.notifiList = state.notifiList.filter(item => item._id !== action.payload.id)
        state.successMessage = action.payload.message; 
       
      })
  }


})


export const {setIsSuccess,addNotifi} = notificationSlice.actions

export default notificationSlice.reducer