import { getUserById, updateUser, UserDTO } from "@entities/GateWay/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

export const getUserByIdThunk = createAsyncThunk(
  'user/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getUserById(userId)
      return response
    } catch (error: AxiosError | any) {
      return rejectWithValue(error.response?.data)
    }
  })

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({userId, data}: {userId: string, data: UserDTO}, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, data)
      return response
    } catch (error)  {
      return rejectWithValue(error)
    }
  }
)

export interface UserState {
  user: UserDTO | null
  updateResponse: any,
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  updateResponse: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserByIdThunk.pending, (state) => {
        state.isLoading = true
        state.error = null 
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true
        state.error = null 
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.updateResponse = action.payload
        state.error = null
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export default userSlice.reducer