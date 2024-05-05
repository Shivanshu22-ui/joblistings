import { createContext } from "react";
import { openAxiosInstance } from "./instances";

export const api = {
    // getJobPostings: (data) =>{
    //     return openAxiosInstance.post(`getSampleJdJSON`,data);
    // }
    getJObPostings: 'https://api.weekday.technology/adhoc/getSampleJdJSON',
}

export const Context = createContext();
