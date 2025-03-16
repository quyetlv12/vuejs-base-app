import httpClient from '@/auth/httpClient';

export const getUsers = async () => {
    const { data } = await httpClient.get('users/list', {
        params: {
            per_page: 10,
            page: 1
        }
    });
    return data;
};

export const getUser = async (id) => {
    const response = await httpClient.get(`/users/show?id=${id}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await httpClient.post('/users/create', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await httpClient.put(`/users/update/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await httpClient.delete(`/users/delete/${id}`);
    return response.data;
};

export const getPermissions = async () => {
    const response = await httpClient.get('/permissions');
    return response.data;
};

export const getPermission = async (id) => {
    const response = await httpClient.get(`/permissions/${id}`);
    return response.data;
};

export const createPermission = async (permissionData) => {
    const response = await httpClient.post('/permissions', permissionData);
    return response.data;
};

export const updatePermission = async (id, permissionData) => {
    const response = await httpClient.put(`/permissions/${id}`, permissionData);
    return response.data;
};

export const deletePermission = async (id) => {
    const response = await httpClient.delete(`/permissions/${id}`);
    return response.data;
};

export const getRoles = async () => {
    const response = await httpClient.get('/roles');
    return response.data;
};

export const getRole = async (id) => {
    const response = await httpClient.get(`/roles/${id}`);
    return response.data;
};

export const createRole = async (roleData) => {
    const response = await httpClient.post('/roles', roleData);
    return response.data;
};

export const updateRole = async (id, roleData) => {
    const response = await httpClient.put(`/roles/${id}`, roleData);
    return response.data;
};

export const deleteRole = async (id) => {
    const response = await httpClient.delete(`/roles/${id}`);
    return response.data;
};
