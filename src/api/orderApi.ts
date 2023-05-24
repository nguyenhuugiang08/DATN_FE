import axios, { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

const baseUrl = "/order";

export interface DataCreateOrder {
    formData: FormData;
}

const orderApi = {
    getOrder: (axios: AxiosInstance) => {
        return axios.get(`${baseUrl}/user-id`);
    },
    getOrderById: (id: string | undefined) => {
        return axiosClient.get(`${baseUrl}/${id}`);
    },
    createOrder: (data: DataCreateOrder, axios: AxiosInstance) => {
        return axios.post(`${baseUrl}/create`, data.formData);
    },
    changeStatusOrder: (
        id: string | undefined,
        newStatus: string | undefined,
        axios: AxiosInstance
    ) => {
        return axios.put(`${baseUrl}/change-status/${id}`, { status: newStatus });
    },
    getAllOrder: (axios: AxiosInstance) => {
        return axios.get(`${baseUrl}`);
    }
};

export default orderApi;
