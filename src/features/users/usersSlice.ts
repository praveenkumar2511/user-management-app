import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as usersApi from "../../api/usersApi";
import type { UsersState, User } from "./types";

const initialState: UsersState = { list: [], loading: false, error: null };

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await usersApi.getUsers();
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        return rejectWithValue(error.response?.data?.message ?? error.message ?? "Failed to load users");
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Failed to load users");
    }
  }
);

export const createUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "users/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await usersApi.createUserApi(payload);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        return rejectWithValue(error.response?.data?.message ?? error.message ?? "Failed to create user");
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Failed to create user");
    }
  }
);

export const updateUser = createAsyncThunk<User, { id: string; payload: Partial<User> }, { rejectValue: string }>(
  "users/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await usersApi.updateUserApi(id, payload);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        return rejectWithValue(error.response?.data?.message ?? error.message ?? "Failed to update user");
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await usersApi.deleteUserApi(id);
      return id;
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const error = err as { response?: { data?: { message?: string } }, message?: string };
        return rejectWithValue(error.response?.data?.message ?? error.message ?? "Failed to delete user");
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Failed to delete user");
    }
  }
);

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //>>> fetch
      .addCase(fetchUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.payload ?? a.error.message; })
      //>>> create
      .addCase(createUser.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(createUser.rejected, () => { /* handle if needed */ })
      //>>> update
      .addCase(updateUser.fulfilled, (s, a) => {
        s.list = s.list.map(u => (u.id === a.payload.id ? a.payload : u));
      })
      //>>> delete
.addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
  state.list = state.list.filter(u => u.id !== String(action.payload));
});
  }
});

export default slice.reducer;
