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
    </div>
</template>
<script setup>
import NewUser from './NewUser.vue';
import { Search } from '@element-plus/icons-vue'
import { getUsers } from '@/composables/users'
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalUsers = ref(0)
const users = ref([])
const user = JSON.parse(localStorage.getItem('auth'))

onMounted(async () => {
    await fetchUsers()
})

const fetchUsers = async () => {
    await getUsers(currentPage.value, itemsPerPage.value, '', '', user.token).then((response) => {
      console.log(response.data)
        // users.value = response.data.items
        // itemsPerPage.value = response.data.page_size
        // totalUsers.value = response.data.total
    }).catch((error) => {
        console.log(error)
    })
}
</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>