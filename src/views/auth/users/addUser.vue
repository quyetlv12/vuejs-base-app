<script setup>
import { ref } from 'vue';

const formData = ref({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    status: 1,
    profile_photo_path: '',
    roles_id: [],
    status_two_factor: 0
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
</script>

<template>
    <Fluid>
        <div class="card">
            <h2 class="text-2xl font-bold mb-6">Add New User</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label for="name">Full Name</label>
                    <InputText id="name" v-model="formData.name" type="text" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="formData.username" type="text" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="formData.email" type="email" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="phone">Phone</label>
                    <InputText id="phone" v-model="formData.phone" type="tel" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="password">Password</label>
                    <Password id="password" v-model="formData.password" toggleMask />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="status">Status</label>
                    <Dropdown id="status" v-model="formData.status" :options="statusOptions" optionLabel="name" optionValue="id" placeholder="Select Status" class="w-full" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="roles">Roles</label>
                    <MultiSelect id="roles" v-model="formData.roles_id" :options="roleOptions" optionLabel="name" optionValue="id" placeholder="Select Roles" class="w-full" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="two_factor">Two Factor Authentication</label>
                    <InputSwitch v-model="formData.status_two_factor" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="photo">Profile Photo</label>
                    <FileUpload id="photo" mode="basic" name="photo" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="formData.profile_photo_path = $event.files[0].name" />
                </div>
            </div>

            <div class="flex justify-end mt-6 gap-2">
                <Button label="Cancel" severity="secondary" text />
                <Button label="Save User" />
            </div>
        </div>
    </Fluid>
</template>
