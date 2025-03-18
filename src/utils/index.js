export const hasPermission = (requiredPermission, permissions = []) => {
    if (!requiredPermission) return true;
    return permissions.includes(requiredPermission);
};
