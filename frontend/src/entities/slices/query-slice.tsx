import { createQuery, getQueryResponse, QueryDTO } from "@entities/QueryService/QueryCreate"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const createQueryThunk = createAsyncThunk(
  'query/createQuery',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await createQuery(file)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }     
  }
)

export const getQueryResponseThunk = createAsyncThunk(
  'query/getQueryResponse',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getQueryResponse(userId)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export interface QueryState {
  isLoading: boolean
  query: QueryDTO | null
  querySuccess: any
  error: string | null
}

const initialState: QueryState = {
  isLoading: false,
  query: null,
  querySuccess: null,
  error: null,
}

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQueryThunk.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createQueryThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.querySuccess = action.payload
        state.error = null
      })
      .addCase(createQueryThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

      .addCase(getQueryResponseThunk.pending, (state, action) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getQueryResponseThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.query = action.payload
        state.error = null
      })
      .addCase(getQueryResponseThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export default querySlice.reducer