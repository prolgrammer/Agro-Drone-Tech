import { LoginDTO, RegisterDTO, signIn, signUp } from '@entities/GateWay/auth';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (data: RegisterDTO, { rejectWithValue }) => {
    try {
      const response = await signUp(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }     
  }
)

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (data: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await signIn(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }     
  }
)

export interface AuthState {
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
        state.error = null
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
        state.error = null
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default authSlice.reducer
