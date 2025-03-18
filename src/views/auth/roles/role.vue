<script setup>
import { deleteRole, getRoles } from '@/service/userService';
import { useMutation } from '@tanstack/vue-query';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const confirm = useConfirm();
const toast = useToast();
const isLoading = ref(false);
const tableConfig = ref({
    per_page: 2, // Changed from 10 to 2
    page: 1,
    total: 0,
    rows: 2, // Changed from 10 to 2
    totalPages: 0
});

const loadUsers = async () => {
    try {
        isLoading.value = true;
        const res = await getRoles({
            page: tableConfig.value.page,
            per_page: tableConfig.value.per_page
        });
        users.value = res?.data?.data;
        tableConfig.value.total = res?.data?.total;
        tableConfig.value.totalPages = res?.data?.last_page;
    } catch (error) {
        console.error('Error loading users:', error);
        toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Không thể tải danh sách người dùng',
            life: 3000
        });
    } finally {
        isLoading.value = false;
    }
};

// Initial load
onMounted(() => {
    loadUsers();
});

const onPage = (event) => {
    tableConfig.value.page = event.page + 1;
    tableConfig.value.per_page = event.rows;
    loadUsers();
};

const addRole = () => {
    router.push('/auth/role/add');
};

const editUser = (user) => {
    router.push({
        path: '/auth/role/edit',
        query: {
            id: user.id
        }
    });
};

// Delete user mutation
const deleteUserMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
        loadUsers();
        toast.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đã xóa vai trò',
            life: 3000
        });
    },
    onError: () => {
        toast.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Không thể xóa vai trò'
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
                    <div class="font-semibold text-2xl">Vai trò</div>

                    <Button label="Thêm vai trò" icon="pi pi-plus" severity="success" @click="addRole" />
                </div>
                <DataTable
                    :value="users"
                    :paginator="true"
                    :rows="tableConfig.per_page"
                    :loading="isLoading"
                    :totalRecords="tableConfig.total"
                    :lazy="true"
                    @page="onPage"
                    responsiveLayout="scroll"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Hiển thị {first} đến {last} của {totalRecords} bản ghi"
                    :rowsPerPageOptions="[2, 5, 10, 20]"
                >
                    <Column field="id" header="Mã vai trò" sortable class="text-center"></Column>
                    <Column field="name" header="Tên vai trò" sortable class="text-center"></Column>
                    <Column :exportable="false" style="min-width: 8rem" class="text-center">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editUser(slotProps.data)" :hidden="slotProps.data.id === 1" />
                            <Button v-if="slotProps.data.id !== 1" icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="handleDeleteUser(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Toast />
    <ConfirmDialog />
</template>
