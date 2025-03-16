import httpClient from '@/auth/httpClient';

export const login = async (username, password) => {
    const response = await httpClient.post('/auth/login', { username, password });
    return response.data;
};
