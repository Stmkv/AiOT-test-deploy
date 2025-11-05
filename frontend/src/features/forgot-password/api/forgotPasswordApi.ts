import { api } from "@/shared/lib/axiosInstance";

export interface forgotPasswordData {
  email: string;
}

export const forgotPassword = async (data: forgotPasswordData) => {
  const res = await api.post("/auth-service/auth/reset-password", data);
  return res.data;
};
