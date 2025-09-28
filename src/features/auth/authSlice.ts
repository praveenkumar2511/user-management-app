import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/authApi";
import type { LoginPayload, LoginResponse } from "../../api/authApi";
import { saveToken, clearToken } from "../../utils/token";
import type { RootState } from "../../app/store";
import type { AuthState } from "./ types";
import type { User } from "../users/types";

const initialState: AuthState = { token: null, user: null, loading: false, error: null };

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginRequest(credentials);
      return data;
    } catch (error: unknown) {
      let errorMessage = 'Login failed';
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
        errorMessage = String((error as { response: { data: { error: unknown } } }).response.data.error);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      clearToken();
    },
    setTokenFromStorage(state, action: PayloadAction<{ token: string; user?: User | null }>) {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, action) => {
        s.loading = false;
        s.token = action.payload.token;
        s.user = action.payload.user;
        saveToken(action.payload.token);
      })
      .addCase(loginUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload ?? action.error.message;
      });
  }
});

export const { logout, setTokenFromStorage } = slice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default slice.reducer;
