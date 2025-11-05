import { api } from "@/shared/lib/axiosInstance";

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await api.post("/auth-service/auth/login", data);
  return res.data;
};
