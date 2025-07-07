<template>
    <div>
        <!-- Search and New Vehicle -->
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewVehicle />
            <el-input v-model="search" placeholder="Search by brand or model" clearable class="search-input"
                size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>

        <!-- Table -->
        <el-table :data="vehicles" style="width: 100%; min-height: 400px;" :border="true" :highlight-current-row="true">
            <el-table-column prop="class" label="Class" />
            <el-table-column prop="brand.name" label="Brand" />
            <el-table-column prop="model" label="Model" />
            <el-table-column prop="daily_rate.text" label="Price" />
            <el-table-column prop="color" label="Color" />
            <el-table-column prop="year" label="Year" />
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
                                <el-dropdown-item @click="editVehicle(scope.row)">Edit Vehicle</el-dropdown-item>
                                <el-dropdown-item divided @click="deleteVehicle(scope.row)">Delete
                                    Vehicle</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No vehicles found</span>
                </div>
            </template>
        </el-table>

        <!-- Pagination -->
        <div class="flex justify-end mt-6">
            <el-pagination background layout="prev, pager, next" :total="totalCars" :page-size="itemsPerPage"
                v-model:current-page="currentPage" @current-change="handlePageChange" />
        </div>

        <EditVehicle v-show="editModalVisible" :vehicle="vehicleToEdit" :visible="editModalVisible"
            @close="editModalVisible = false" />
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { getVehicles } from '@/composables/vehicles'
import { MoreFilled, Search } from '@element-plus/icons-vue'
import NewVehicle from './vehicles/New.vue'
import EditVehicle from './EditVehicle.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const vehicles = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalCars = ref(0)
const editModalVisible = ref(false)
const vehicleToEdit = reactive({})

onMounted(async () => {
    await fetchVehicles()
})

watch(search, (newVal) => {
    currentPage.value = 1
    fetchVehicles()
})

const fetchVehicles = async () => {
    await getVehicles(currentPage.value, itemsPerPage.value, '', search.value, '', '').then((response) => {
        vehicles.value = response.data.items
        itemsPerPage.value = response.data.page_size
        totalCars.value = response.data.total
    }).catch((error) => {
        console.log(error)
    })
}

const handlePageChange = async (newPage) => {
    currentPage.value = newPage
    await fetchVehicles()
}

const editVehicle = (vehicle) => {
    Object.assign(vehicleToEdit, vehicle)
    editModalVisible.value = true
}

const deleteVehicle = (vehicle) => {
    ElMessageBox.confirm(
        `Are you sure you want to delete the vehicle ${vehicle.brand_name} ${vehicle.model}?`,
        'Delete Confirmation',
        {
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Vehicle deleted successfully',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete cancelled',
            })
        })
}

</script>

<style scoped>
.search-input {
    width: 240px;
}
</style>
