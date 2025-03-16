<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { login } from '@/service/auth';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const username = ref('');
const password = ref('');
const checked = ref(false);

const router = useRouter();
const store = useStore();

const { mutate, isPending } = useMutation({
    mutationFn: () => login(username.value, password.value),
    onSuccess: (data) => {
        const userData = {
            user_email: data.data.user_email,
            user_name: data.data.user_name,
            avatar: data.data.avatar,
            permission: data.data.permission,
            role: data.data.role
        };
        store.dispatch('setUserData', { user: userData, token: data.data.token });
        router.push('/');
    },
    onError: (error) => {
        console.error('Login failed:', error);
    }
});

const handleLogin = () => {
    mutate();
};

const handleForgotPassword = () => {
    router.push('/forgot-password');
};

const handleRememberMe = (value) => {
    checked.value = value;
    if (value) {
        // Store email in localStorage when remember me is checked
        localStorage.setItem('rememberedEmail', email.value);
    } else {
        // Remove email from localStorage when unchecked
        localStorage.removeItem('rememberedEmail');
    }
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <!-- ============= LOGO HERE ======== -->
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Đăng nhập</div>
                        <span class="text-muted-color font-medium">Đăng nhập tài khoản của bạn</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Tên đăng nhập</label>
                        <InputText id="email1" type="text" class="w-full md:w-[30rem] h-[50px] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mật khẩu</label>
                        <Password id="password1" v-model="password" :toggleMask="true" class="mb-4 h-[50px]" fluid :feedback="false"></Password>

                        <!-- <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2" @change="handleRememberMe"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" @click="handleForgotPassword">Forgot password?</span>
                        </div> -->
                        <Button label="Đăng nhập" :loading="isPending" class="w-full mt-5 h-[50px]" @click="handleLogin"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
