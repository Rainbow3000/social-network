import { configureStore } from '@reduxjs/toolkit'
import {appSlice,statSlice,userSlice} from './slice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    stat: statSlice,
    user:userSlice
  },
})