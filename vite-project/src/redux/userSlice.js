import {createSlice} from '@reduxjs/toolkit'
import { userReducers } from '../actions/userReducers';

export const slice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    isLogged: false,
  },
  reducers: userReducers,
})

export const {changeUser, logout} = slice.actions

export const selectUser = state => state.user

export default slice.reducer