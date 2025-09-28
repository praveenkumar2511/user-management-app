// usersApi.ts
import api from "./axiosInstance";
import type { User } from "../features/users/types";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data.data; // ✅ return the array inside the `data` field
};


export const createUserApi = async (payload: Partial<User>): Promise<User> => {
  const res = await api.post("/users", payload);
  return res.data;
};

export const updateUserApi = async (id: string, payload: Partial<User>): Promise<User> => {
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
};

export const deleteUserApi = async (id: number): Promise<void> => {
    // console.log(id, "api id");

  await api.delete(`/users/${id}`);
};
