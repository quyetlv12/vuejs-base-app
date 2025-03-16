<script setup>
import { deleteUser, getUsers } from '@/service/userService';
import { useMutation } from '@tanstack/vue-query';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const confirm = useConfirm();
const toast = useToast();

// Theo dõi sự thay đổi của data
watchEffect(() => {
    getUsers().then((res) => {
        users.value = res?.data?.data;
    });
});

const addUser = () => {
    router.push('/auth/user/add');
};

// Delete user mutation
const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
        // Refresh user list after successful deletion
        getUsers().then((res) => {
            users.value = res?.data?.data;
        });

        toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đã xóa người dùng',
            life: 3000
        });
    },
    onError: () => {
        toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Không thể xóa người dùng'
        });
    }
});

const handleDeleteUser = (user) => {
    confirm.require({
        message: 'Bạn có chắc chắn muốn xóa người dùng này không?',
        header: 'Xác nhận xóa người dùng',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Xóa',
        rejectLabel: 'Hủy',
        accept: () => {
            deleteUserMutation.mutate(user.id);
        }
    });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-between items-center mb-4">
                    <div class="font-semibold text-2xl">Tài khoản</div>

                    <Button label="Thêm tài khoản" icon="pi pi-plus" severity="success" @click="addUser" />
                </div>
                <DataTable
                    :value="users"
                    :paginator="true"
                    :rows="10"
                    :loading="isLoading"
                    responsiveLayout="scroll"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 20, 50]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                >
                    <Column field="id" header="Mã tài khoản" sortable class="text-center"></Column>
                    <Column field="username" header="Tên tài khoản" sortable class="text-center"></Column>
                    <Column field="email" header="Email" sortable class="text-center"></Column>
                    <Column field="role" header="Quyền" sortable class="text-center"></Column>
                    <Column field="status" header="Trạng thái" sortable class="text-center">
                        <template #body="slotProps">
                            <Tag :value="slotProps.data.status === 1 ? 'Hoạt động' : 'Không hoạt động'" :severity="slotProps.data.status === 1 ? 'success' : 'danger'" />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 8rem" class="text-center">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editUser(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="handleDeleteUser(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Toast />
    <ConfirmDialog />
</template>
