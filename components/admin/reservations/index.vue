<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewReservation />
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <el-table :data="reservations" style="width: 100%; min-height: 400px;" :border="true"
            :highlight-current-row="true">
            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No reservations found</span>
                </div>
            </template>

        </el-table>
    </div>
</template>
<script setup>
import NewReservation from './NewReservation.vue';
import { Search } from '@element-plus/icons-vue'
import { getReservations } from '@/composables/reservations'
const reservations = ref([])
const search = ref('')
const user = JSON.parse(localStorage.getItem('auth'))
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalReservations = ref(0)
onMounted(() => {
    getReservationsData()

})

const getReservationsData = async () => {
    await getReservations(currentPage.value, itemsPerPage.value, user.token).then((response) => {
        reservations.value = response
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