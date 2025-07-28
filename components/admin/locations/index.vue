<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewLocation />
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="locations" style="width: 100%; min-height: 400px;" :border="true"
            :highlight-current-row="true">
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="type" label="Type" >
                <template #default="scope">
                    <el-tag :type="getTypeTag(scope.row.type)" effect="light" class="capitalize">
                        {{ scope.row.type }}
                    </el-tag>
                </template>
                </el-table-column>
            <el-table-column prop="location.city" label="City" />
            <el-table-column prop="location.state" label="State" />
            <el-table-column prop="location.country" label="Country" />
        <el-table-column props="actions" label="Actions" width="100">
            <template #default="scope">
                <el-dropdown trigger="click">
                    <span class="cursor-pointer">
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="editLocation(scope.row)">Edit Location</el-dropdown-item>
                            <el-dropdown-item divided @click="deleteLocation(scope.row)">Delete Location</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
            </el-table-column>
            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No Locations found</span>
                </div>
            </template>
        </el-table>
    
        <EditLocation v-show="editModalVisible" :location="locationToEdit" :visible="editModalVisible"
            @close="editModalVisible = false" />
    </div>
</template>
<script setup>
import NewLocation from './NewLocation.vue';
import EditLocation from './EditLocation.vue';
import { Search, MoreFilled } from '@element-plus/icons-vue'
import { getLocations } from '@/composables/locations'
const locations = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalLocations = ref(0)
const editModalVisible = ref(false)
const locationToEdit = reactive({})
onMounted(() => {
    getLocationsData()

})

const getLocationsData = async () => {
    await getLocations(currentPage.value, itemsPerPage.value,'').then((response) => {
        locations.value = response.data
        
    }).catch((error) => {
        console.log(error)
    })

}

const getTypeTag = (type) => {
    switch (type.toLowerCase()) {
        case 'main_office':
            return 'success';
        case 'airport':
            return 'info';
        case 'hotel':
            return 'warning';
        case 'branch':
            return 'danger';
        default:
            return '';
    }
};

const editLocation = (location) => {
    Object.assign(locationToEdit, location)
    editModalVisible.value = true
}

const deleteLocation = (location) => {
  
}


</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>