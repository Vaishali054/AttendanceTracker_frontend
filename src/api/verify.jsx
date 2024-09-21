import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const sendOTP = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/sendOTP`, { email});
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};
export const verifyOTP = async (token,otp) => {
  try {
    const response = await axiosInstance.post(`/auth/verifyOTP`, { token, otp});
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};
