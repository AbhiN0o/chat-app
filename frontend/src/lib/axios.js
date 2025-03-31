import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"http://localhost:1212/api",
    withCredentials:true
})