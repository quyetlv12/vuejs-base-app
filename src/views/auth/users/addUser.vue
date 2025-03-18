<script setup>
import router from '@/router';
import { createUser } from '@/service/userService';
import { useMutation } from '@tanstack/vue-query';
import { computed, ref } from 'vue';

const formData = ref({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirm password field
    status: 1,
    profile_photo_path: '',
    roles_id: [1],
    status_two_factor: 0
});

const formErrors = ref({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
        router.push('/users');
    }
});

const roleOptions = ref([
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Manager' }
]);

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

    if (!formData.value.password) {
        formErrors.value.password = 'Password is required';
        isValid = false;
    }

    if (!formData.value.phone) {
        formErrors.value.phone = 'Phone is required';
        isValid = false;
    }

    if (!formData.value.confirmPassword) {
        formErrors.value.confirmPassword = 'Confirm password is required';
        isValid = false;
    } else if (!passwordsMatch.value) {
        formErrors.value.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    return isValid;
};

const handleCreateUser = async () => {
    if (!validateForm()) {
        return;
    }

    const data = {
        name: formData.value.name,
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
        roles_id: formData.value.roles_id,
        status: formData.value.status,
        status_two_factor: formData.value.status_two_factor,
        profile_photo_path: formData.value.profile_photo_path,
        phone: formData.value.phone
    };
    console.log('data', data);
    mutate(data);
    // createUserMutation.mutateAsync(data);
};
</script>

<template>
    <Fluid>
        <div class="card">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Add New User</h2>
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

                <div class="flex flex-col gap-2">
                    <label for="password">Password</label>
                    <Password id="password" v-model="formData.password" toggleMask :class="{ 'p-invalid': formErrors.password }" />
                    <small class="text-red-500" v-if="formErrors.password">{{ formErrors.password }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="confirmPassword">Confirm Password</label>
                    <Password id="confirmPassword" v-model="formData.confirmPassword" toggleMask :class="{ 'p-invalid': formErrors.confirmPassword }" />
                    <small class="text-red-500" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</small>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="status">Status</label>
                    <Dropdown id="status" v-model="formData.status" :options="statusOptions" optionLabel="name" optionValue="id" placeholder="Select Status" class="w-full" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="roles">Roles</label>
                    <MultiSelect id="roles" v-model="formData.roles_id" :options="roleOptions" optionLabel="name" optionValue="id" placeholder="Select Roles" class="w-full" />
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
                <Button label="Tạo người dùng" :disabled="!passwordsMatch && formData.confirmPassword" @click="handleCreateUser" :loading="isPending" class="w-full" />
            </div>
        </div>
    </Fluid>
</template>
