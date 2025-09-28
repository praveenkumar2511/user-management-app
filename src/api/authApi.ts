import api from "./axiosInstance";

export interface LoginPayload { email: string; password: string; }
export interface LoginResponse { token: string; user: { id: string; email: string; name?: string }; }
// console.log(api.post,"api");

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post("/login", payload);
  return res.data;
};
