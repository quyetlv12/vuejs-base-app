<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Profile</h5>
                <div class="p-fluid formgrid grid gap-5">
                    <div class="field col-12 md:col-6">
                        <label for="username">Username</label>
                        <InputText id="username" type="text" v-model="user.username" class="mt-3" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" type="email" v-model="user.email" class="mt-3" />
                    </div>
                    <div class="field col-12">
                        <label for="avatar">Avatar</label>
                        <div class="flex align-items-center gap-4 mt-5">
                            <Avatar :image="user.avatar" shape="circle" size="large" v-if="user.avatar" />
                            <Avatar icon="pi pi-user" shape="circle" size="large" v-else />
                            <FileUpload mode="basic" name="avatar" accept="image/*" :auto="true" @upload="onUpload" :customUpload="true" @uploader="uploadAvatar" />
                        </div>
                    </div>
                    <div class="flex justify-end w-full">
                        <Button label="Update Profile" icon="pi pi-user-edit" class="p-button-success" @click="updateProfile" :loading="loading" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const userStore = computed(() => store.state.user);
const loading = ref(false);

const user = ref({
    username: userStore.value?.user_name || '',
    email: userStore.value?.user_email || '',
    avatar: userStore.value?.avatar || null
});

const uploadAvatar = async (event) => {
    try {
        const formData = new FormData();
        formData.append('avatar', event.files[0]);

        const response = await axios.post('/api/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        user.value.avatar = response.data.url;
        event.options.clear();
    } catch (error) {
        console.error('Error uploading avatar:', error);
    }
};

const onUpload = (event) => {
    // Handle upload complete event if needed
    console.log('Upload complete:', event);
};

const updateProfile = async () => {
    try {
        loading.value = true;
        const response = await axios.put('/api/update-profile', {
            username: user.value.username,
            email: user.value.email,
            avatar: user.value.avatar
        });

        // Update store with new user data
        await store.dispatch('updateUser', response.data);
    } catch (error) {
        console.error('Error updating profile:', error);
    } finally {
        loading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.p-fluid .p-inputtext {
    width: 100%;
}

.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 20;
    margin-bottom: 1rem;
}
</style>
