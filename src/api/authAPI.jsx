import axiosInstance from "../infra/axiosInstance";
import { AxiosError } from "axios";

export const handleLogin = async (email, password, role) => {
  try {
    const response = await axiosInstance.post(`/auth/login?role=${role}`, { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data || error.message;
    }
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });

    if (response.status === 200 && response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 &&
      error.response.data.message === "Email already in use"
    ) {
      return { success: false, message: "Email already in use" };
    } else {
      console.error("Error registering user:", error);
      return { success: false, error };
    }
  }
};