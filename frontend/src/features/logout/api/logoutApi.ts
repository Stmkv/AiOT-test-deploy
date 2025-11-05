import { api } from "@/shared/lib/axiosInstance";

export interface LogoutData {
  refresh_token: string;
}

export const logout = async (data: LogoutData) => {
  const res = await api.post("/auth-service/auth/logout", data);
  return res.data;
};
