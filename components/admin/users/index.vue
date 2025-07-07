<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewUser />
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="users" style="width: 100%" :border="true" :highlight-current-row="true">
            <el-table-column prop="profile.first_name" label="First Name" />
            <el-table-column prop="profile.last_name" label="Last Name" />
            <el-table-column prop="role" label="Role" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="status" label="Status" align="center">
                <template #default="{ row }">
                    <el-tag :type="getStatusType(row.status)" effect="light" class="capitalize">
                        {{ row.status }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="100">
                <template #default="scope">
                    <el-dropdown trigger="click">
                        <span class="cursor-pointer">
                            <el-icon>
                                <MoreFilled />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="editUser(scope.row)">Edit User</el-dropdown-item>
                                <!-- <el-dropdown-item divided @click="deleteVehicle(scope.row)">Delete
                                    Vehicle</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-end mt-6">
            <el-pagination background layout="prev, pager, next" :total="totalUsers" :page-size="itemsPerPage"
                v-model:current-page="currentPage" @current-change="handlePageChange" />
        </div>

        <EditUser v-show="editModalVisible" :user="userToEdit" :visible="editModalVisible"
            @close="editModalVisible = false" />
    </div>
</template>
<script setup>
import NewUser from './NewUser.vue';
import EditUser from './EditUser.vue';
import { Search } from '@element-plus/icons-vue'
import { getUsers } from '@/composables/users'
import { MoreFilled } from '@element-plus/icons-vue';
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalUsers = ref(0)
const users = ref([])
const editModalVisible = ref(false)
const userToEdit = reactive({})
const user = JSON.parse(localStorage.getItem('auth'))

onMounted(async () => {
    await fetchUsers()
})

const fetchUsers = async () => {
    await getUsers(currentPage.value, itemsPerPage.value, '', '', user.token).then((response) => {
        users.value = response.users
        itemsPerPage.value = response.page_size
        totalUsers.value = response.total
    }).catch((error) => {
        console.log(error)
    })
}

const handlePageChange = async (newPage) => {
    currentPage.value = newPage
    await fetchUsers()
}

const getStatusType = (status) => {
    switch (status.toLowerCase()) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'info';
        case 'banned':
            return 'danger';
        case 'pending':
            return 'warning';
        default:
            return '';
    }
};

const editUser = (user) => {
    Object.assign(userToEdit, user)
    
    editModalVisible.value = true
}


</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>