import { AxiosError } from "axios";
import axiosInstance from "../infra/axiosInstance";

export const getDepartments=async()=>{
    try{
        const response =await axiosInstance.get('/admin/department/get');
        return response.data.departments;
    }
    catch(error){
        if (error instanceof AxiosError) {
            return error.response?.data || error.message;
          }
          throw error;
    }
}