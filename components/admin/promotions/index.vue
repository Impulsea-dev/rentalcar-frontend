<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewPromotion />
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="promotions" style="width: 100%; min-height: 400px;" :border="true"
            :highlight-current-row="true">
            <el-table-column prop="name" label="Name" />
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
                            <el-dropdown-item @click="editPromotion(scope.row)">Edit Promotion</el-dropdown-item>
                            <el-dropdown-item divided @click="deletePromotion(scope.row)">Delete Promotion</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
            </el-table-column>
            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No Promotions Found</span>
                </div>
            </template>
        </el-table>
    
        <!-- <EditLocation v-show="editModalVisible" :location="locationToEdit" :visible="editModalVisible"
            @close="editModalVisible = false" /> -->
    </div>
</template>
<script setup>
// import EditLocation from './EditLocation.vue';
import NewPromotion from './NewPromotion.vue'
import { Search, MoreFilled } from '@element-plus/icons-vue'
import { getPromotions } from '@/composables/promotions'
const promotions = ref([])
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalPromotions = ref(0)
const editModalVisible = ref(false)
const promotionToEdit = reactive({})
onMounted(() => {
    getPromotionsData()

})

const getPromotionsData = async () => {
    await getPromotions(currentPage.value, itemsPerPage.value).then((response) => {
        promotions.value = response.data
        
    }).catch((error) => {
        console.log(error)
    })

}


const editPromotion = (promotion) => {
    Object.assign(promotionToEdit, promotion)
    editModalVisible.value = true
}

const deletePromotion = (promotion) => {
  
}


</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>