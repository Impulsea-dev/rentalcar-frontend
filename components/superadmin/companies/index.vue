<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="companies" style="width: 100%; min-height: 400px;" :border="true"
            :highlight-current-row="true">
            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No Companies found</span>
                </div>
            </template>

        </el-table>
    </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { getCompanyByID } from '@/composables/companies'
const companies = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalCompanies = ref(0)
const user = JSON.parse(localStorage.getItem('auth'))
onMounted(() => {
    getCompaniesData()

})

const getCompaniesData = async () => {
    await getCompanyByID('e112434b-26da-4835-bfaf-f1097f92e801', user.token).then((response) => {
        console.log(response);
        
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