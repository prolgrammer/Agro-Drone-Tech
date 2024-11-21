import { createSlice } from "@reduxjs/toolkit";
import { UserJwtPayload } from "@shared/axios-instanse";
import { clear } from "console";

const initialState: UserJwtPayload = {
  id: null, 
  username: null,
  roles: [],
}

export const tokenDataSlice = createSlice({
  name: 'tokenData',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.roles = action.payload.roles
    },
    clearProfile: (state) => {
      state.id = null
      state.username = null
      state.roles = []
    }
  },
})

export const menuItems = [
  {
    key: '1',
    label: 'Домашняя страница',
    link: '/'
  },
  {
    key: '2',
    label: 'Профиль',
    link: '/private-office/profile'
  },
  {
    key: '3',
    label: 'Мои участки',
    link: '/private-office/area'
  },
  {
    key: '4',
    label: 'Мои запросы',
    link: '/private-office/query/create'
  },
  {
    key: '5',
    label: 'Список пользователей',
    link: '/private-office/users'
  }
]


