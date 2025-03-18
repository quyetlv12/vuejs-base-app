<script setup>
import { createRole, getPermissions, getRoles } from '@/service/userService';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useToast } from 'primevue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const roles = ref([]);

const permissionsQuery = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions
});

const permissions = computed(() => {
    return (
        permissionsQuery?.data?.value?.data?.map((permission) => ({
            id: permission.id,
            name: permission.name,
            guard_name: permission.guard_name,
            module: permission.module,
            description: permission.description
        })) || []
    );
});

const formData = ref({
    name: '',
    permissions: []
});

const formErrors = ref({
    name: '',
    permissions: ''
});

const { mutate, isPending } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
        toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Tạo vai trò thành công',
            life: 3000
        });
        router.push('/auth/roles');
    },
    onError: (error) => {
        if (error?.response?.data?.data['name']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['name'][0],
                life: 3000
            });
        }
        if (error?.response?.data?.data['permissions']) {
            formErrors.value.permissions = error?.response?.data?.data['permissions'][0];
        }
    }
});

const validateForm = () => {
    let isValid = true;
    formErrors.value = {
        name: '',
        permissions: ''
    };

    if (!formData.value.name.trim()) {
        formErrors.value.name = 'Tên vai trò là bắt buộc';
        isValid = false;
    }

    if (!formData.value.permissions.length) {
        formErrors.value.permissions = 'Vui lòng chọn ít nhất một quyền';
        isValid = false;
    }

    return isValid;
};

const handleCreateRole = async () => {
    if (!validateForm()) {
        return;
    }
    const data = {
        name: formData.value.name,
        permissions: formData.value.permissions
    };
    console.log('data', data);

    mutate(data);
};

watchEffect(() => {
    getRoles().then((res) => {
        roles.value = res.data;
    });
});
</script>

<template>
    <Fluid>
        <div class="card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Add Role</h2>
                <div class="flex gap-2">
                    <Button label="Back" icon="pi pi-arrow-left" class="p-button-outlined p-button-secondary" @click="$router.back()" />
                </div>
            </div>

            <Divider align="left">Role Information</Divider>
            <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div class="flex flex-col gap-2">
                    <label for="name">Tên vai trò</label>
                    <InputText id="name" v-model="formData.name" type="text" :class="{ 'p-invalid': formErrors.name }" />
                    <small class="text-red-500" v-if="formErrors.name">{{ formErrors.name }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <Divider align="left">Permissions</Divider>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div v-for="permission in permissions" :key="permission.name" class="flex items-center gap-2 mb-5">
                            <Checkbox :id="'permission-' + permission.id" :value="permission.name" v-model="formData.permissions" :binary="false" class="w-6 h-6" />
                            <label
                                :for="'permission-' + permission.id"
                                class="cursor-pointer select-none"
                                @click="formData.permissions.includes(permission.name) ? (formData.permissions = formData.permissions.filter((p) => p !== permission.name)) : formData.permissions.push(permission.name)"
                                >{{ permission.description }}</label
                            >
                        </div>
                    </div>
                    <small class="text-red-500" v-if="formErrors.permissions">{{ formErrors.permissions }}</small>
                </div>
            </div>

            <div class="flex justify-end mt-6 gap-2">
                <Button label="Tạo vai trò" @click="handleCreateRole" :loading="isPending" class="w-full" />
            </div>
        </div>
    </Fluid>
</template>
