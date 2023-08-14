import axios from '../utils/axiosConfig';

export const getAllUser = async () => {
    const response = await axios.get<UserApiResponse[]>(`/users`);
    return response.data;
};
export const postUser = async (data: UserApiRequest) => {
    const response = await axios.post<UserApiResponse>(`/users`, data);
    return response.data;
};