import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import messageSlice from './messageSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice,
  }
})