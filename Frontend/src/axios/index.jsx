import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:'http://116.202.210.102:8000/'
})