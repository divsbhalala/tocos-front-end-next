import axios from '../utils/axiosConfig';
import {AxiosError} from "axios";

export const getAllTransaction = async () => {
    const response = await axios.get<TransactionApiResponse[]>(`/transactions`);
    return response.data;
};
export const postTransaction = async (data: TransactionApiRequest) => {
    const response = await axios.post<TransactionApiResponse>(`/transactions`, data);
    return response.data;
};