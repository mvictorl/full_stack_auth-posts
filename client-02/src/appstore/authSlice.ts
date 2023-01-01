import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { $api } from '../http'
import { AxiosResponse } from 'axios'
import { IUser } from '../models/IUser'

import { setMessage } from './messageSlice'
import { AuthService } from '../services/auth.service'

const initialState = {
  isAuth: false,
  user: {} as IUser,
  isActivated: false,
  roles: []
}

const currentUser = localStorage.getItem('user')
const user = currentUser ? JSON.parse(currentUser) : null

type registerProps = {
  username: string
  email: string
  password: string
}

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }: registerProps, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password)
      thunkAPI.dispatch(setMessage(response.data.message))
      return response.data
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      thunkAPI.dispatch(setMessage(message))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

type loginProps = {
  email: string
  password: string
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: AnyAction, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password)
      return { user: data.user }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      thunkAPI.dispatch(setMessage(message))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout()
})

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(register.pending, state => {});
    builder.addCase(register.rejected, state => {
      state.isAuth = false
    })
    builder.addCase(register.fulfilled, state => {
      state.isAuth = true
    })
    builder.addCase(login.rejected, state => {
      state.isAuth = false
      state.user = {} as IUser
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true
      state.user = action.payload.user
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false
      state.user = {} as IUser
    })
  }
})

export default authSlice.reducer

// const fetchUserById = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: { email: string, password: string }) => {
//     const response = await $api.post('/user/login', { email, password })
//     return response.data
//   }
// )

// const initialState = {
//   isAuth: false,
//   user: {} as IUser,
//   isActivated: false,
//   roles: []
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action) {
//       return { ...action.payload, isAuth: true }
//     },
//     logout() {
//       return initialState
//     }
//   },
//   extraReducers: (builder) => { }
// })

// export const { login, logout } = authSlice.actions

// export default authSlice.reducer