<script setup>
import { getRoles, getUser, updateUser } from '@/service/userService';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'primevue';
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const roles = ref([]);
const formData = ref({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: '',
    profile_photo_path: '',
    roles_id: '',
    status_two_factor: 0
});

const formErrors = ref({
    name: '',
    username: '',
    email: ''
});

const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateUser(route.query.id, data),
    onSuccess: () => {
        toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Cập nhật người dùng thành công',
            life: 3000
        });
        router.push('/auth/user');
    },
    onError: (error) => {
        console.log('error', error?.response?.data?.data['email']);
        if (error?.response?.data?.data['username']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['username'][0],
                life: 3000
            });
        }
        if (error?.response?.data?.data['name']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['name'][0],
                life: 3000
            });
        }
        if (error?.response?.data?.data['email']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['email'][0],
                life: 3000
            });
        }
        if (error?.response?.data?.data['phone']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['phone'][0],
                life: 3000
            });
        }
        if (error?.response?.data?.data['password']) {
            toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.data['password'][0],
                life: 3000
            });
        }
    }
});

const statusOptions = ref([
    { id: 1, name: 'Active' },
    { id: 0, name: 'Inactive' }
]);

const passwordsMatch = computed(() => {
    return formData.value.password === formData.value.confirmPassword;
});

const validateForm = () => {
    let isValid = true;
    formErrors.value = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    if (!formData.value.name.trim()) {
        formErrors.value.name = 'Full name is required';
        isValid = false;
    }

    if (!formData.value.username.trim()) {
        formErrors.value.username = 'Username is required';
        isValid = false;
    }

    if (!formData.value.email.trim()) {
        formErrors.value.email = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        formErrors.value.email = 'Invalid email format';
        isValid = false;
    }

    if (!formData.value.phone) {
        formErrors.value.phone = 'Phone is required';
        isValid = false;
    }

    return isValid;
};

const handleUpdateUser = async () => {
    if (!validateForm()) {
        return;
    }

    const data = {
        id: route.query.id,
        name: formData.value.name,
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
        roles_id: [formData.value.roles_id],
        status: formData.value.status,
        status_two_factor: formData.value.status_two_factor,
        profile_photo_path: formData.value.profile_photo_path,
        phone: formData.value.phone
    };
    mutate(data);
};

watchEffect(() => {
    getRoles().then((res) => {
        roles.value = res.data.data;
    });

    if (route.query.id) {
        getUser(route.query.id).then((res) => {
            const userData = res.data;
            formData.value = {
                name: userData.name,
                username: userData.username,
                phone: userData.phone,
                email: userData.email,
                password: '',
                confirmPassword: '',
                status: userData.status,
                profile_photo_path: userData.profile_photo_path,
                roles_id: userData.roles_id[0],
                status_two_factor: userData.status_two_factor
            };
        });
    }
});
</script>

<template>
    <Fluid>
        <div class="card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Edit User</h2>
                <div class="flex gap-2">
                    <Button label="Back" icon="pi pi-arrow-left" class="p-button-outlined p-button-secondary" @click="$router.back()" />
                </div>
            </div>

            <Divider align="left">User Information</Divider>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label for="name">Full Name</label>
                    <InputText id="name" v-model="formData.name" type="text" :class="{ 'p-invalid': formErrors.name }" />
                    <small class="text-red-500" v-if="formErrors.name">{{ formErrors.name }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="formData.username" type="text" :class="{ 'p-invalid': formErrors.username }" />
                    <small class="text-red-500" v-if="formErrors.username">{{ formErrors.username }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="formData.email" type="email" :class="{ 'p-invalid': formErrors.email }" />
                    <small class="text-red-500" v-if="formErrors.email">{{ formErrors.email }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="phone">Phone</label>
                    <InputText id="phone" v-model="formData.phone" type="tel" :class="{ 'p-invalid': formErrors.phone }" />
                    <small class="text-red-500" v-if="formErrors.phone">{{ formErrors.phone }}</small>
                </div>

                <!-- <div class="flex flex-col gap-2">
                    <label for="password">Password</label>
                    <Password id="password" v-model="formData.password" toggleMask :class="{ 'p-invalid': formErrors.password }" />
                    <small class="text-red-500" v-if="formErrors.password">{{ formErrors.password }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="confirmPassword">Confirm Password</label>
                    <Password id="confirmPassword" v-model="formData.confirmPassword" toggleMask :class="{ 'p-invalid': formErrors.confirmPassword }" />
                    <small class="text-red-500" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</small>
                </div> -->

                <div class="flex flex-col gap-2">
                    <label for="status">Status</label>
                    <Dropdown id="status" v-model="formData.status" :options="statusOptions" optionLabel="name" optionValue="id" placeholder="Select Status" class="w-full" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="roles">Roles</label>
                    <Dropdown id="roles" v-model="formData.roles_id" :options="roles" optionLabel="name" optionValue="id" placeholder="Select Roles" class="w-full" />
                </div>

                <!-- <div class="flex flex-col gap-2">
                    <label for="two_factor">Two Factor Authentication</label>
                    <InputSwitch v-model="formData.status_two_factor" />
                </div> -->

                <!-- <div class="flex flex-col gap-2">
                    <label for="photo">Profile Photo</label>
                    <FileUpload id="photo" mode="basic" name="photo" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="formData.profile_photo_path = $event.files[0].name" />
                </div> -->
            </div>

            <div class="flex justify-end mt-6 gap-2">
                <!-- <Button label="Cancel" severity="secondary" text /> -->
                <Button label="Cập nhật" :disabled="!passwordsMatch && formData.confirmPassword" @click="handleUpdateUser" :loading="isPending" class="w-full" />
            </div>
        </div>
    </Fluid>
</template>
