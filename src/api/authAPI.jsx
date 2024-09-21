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

export const registerUser = async (values) => {
  try {
    const response = await axiosInstance.post("auth/signup", {
      name:values.name,
      password: values.password,
      semester: values.semester,
      department: values.department,
      role:"Student",
      degree: values.degree,
      email:values.email,
    });
    console.log(response.data)
    return response.data;
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