import httpClient from '@/auth/httpClient';

export const getUsers = async (configParams) => {
    const { data } = await httpClient.get('users/list', {
        params: configParams
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
    const response = await httpClient.put(`/users/update`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await httpClient.delete(`/users/delete?id=${id}`);
    return response.data;
};

export const getPermissions = async () => {
    const response = await httpClient.get('/permission/list');
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

export const getRoles = async (configParams) => {
    const response = await httpClient.get('/role/list', {
        params: configParams
    });
    return response.data;
};

export const getRole = async (id) => {
    const response = await httpClient.get(`/role/show?id=${id}`);
    return response.data;
};

export const createRole = async (roleData) => {
    const response = await httpClient.post('/role/create', roleData);
    return response.data;
};

export const updateRole = async (roleData) => {
    const response = await httpClient.put(`/role/update`, roleData);
    return response.data;
};

export const deleteRole = async (id) => {
    const response = await httpClient.delete(`/role/delete?id=${id}`);
    return response.data;
};
