import { createSlice } from '@reduxjs/toolkit'

const appState = {
  isShowOverlay:false
}

export const appSlice = createSlice({
  name: 'app',
  initialState:appState,
  reducers: {
    showOverlay : (state)=>{
      state.isShowOverlay = true; 
    },
    hiddenOverlay : (state)=>{
      state.isShowOverlay = false; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { showOverlay,hiddenOverlay } = appSlice.actions

export default appSlice.reducer