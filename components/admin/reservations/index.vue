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
            <el-table-column label="Full Name">
                <template #default="scope">
                    <span>{{ scope.row.customer.profile.first_name }} {{ scope.row.customer.profile.last_name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="vehicle.brand_name" label="Vehicle Brand">
                <template #default="scope">
                    <span>{{ scope.row.vehicle.brand_name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Vehicle Info">
                <template #default="scope">
                    <span>
                        {{ scope.row.vehicle.model }} - {{ scope.row.vehicle.color }} - {{ scope.row.vehicle.year }}
                    </span>
                </template>
            </el-table-column>


            <el-table-column prop="pickup_date" label="Pickup Date">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.pickup_date) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="return_date" label="Return Date">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.return_date) }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="Total Days">
                <template #default="scope">
                    <span>{{ getTotalDays(scope.row.pickup_date, scope.row.return_date) }}</span>
                </template> 

            </el-table-column> -->
            <el-table-column prop="payment_info.type" label="Payment Type">
                <template #default="scope">
                    <span>{{ scope.row.payment_info.type }}</span>
                </template>
            </el-table-column>
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
                                <el-dropdown-item @click="viewReservation(scope.row)">
                                    View Details
                                </el-dropdown-item>
                                <el-dropdown-item @click="editReservation(scope.row)">Edit
                                    Reservation</el-dropdown-item>
                                <!-- <el-dropdown-item divided>Delete Reservation</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>

            <template #empty>
                <div class="flex flex-col items-center justify-center h-40">
                    <span>No reservations found</span>
                </div>
            </template>

        </el-table>
        <div class="flex justify-end mt-6">
            <el-pagination background layout="prev, pager, next" :total="totalReservations" :page-size="itemsPerPage"
                v-model:current-page="currentPage" @current-change="handlePageChange" />
        </div>
        <EditReservation v-show="editModalVisible" :reservation="reservationToEdit" :visible="editModalVisible"
            @close="editModalVisible = false" />
        <ReservationDetails v-model="showReservationModal" :reservation="selectedReservation" />
    </div>
</template>
<script setup>
import NewReservation from './NewReservation.vue';
import EditReservation from './EditReservation.vue';
import ReservationDetails from './ReservationDetails.vue';
import { Search, MoreFilled } from '@element-plus/icons-vue'
import { getReservations } from '@/composables/reservations'
import { getTotalDays } from '@/utils/index'
const reservations = ref([])
const search = ref('')
const user = JSON.parse(localStorage.getItem('auth'))
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalReservations = ref(0)
const editModalVisible = ref(false)
const reservationToEdit = reactive({})

const showReservationModal = ref(false)
const selectedReservation = ref(null)
onMounted(() => {
    getReservationsData()

})

const getReservationsData = async () => {
    await getReservations(currentPage.value, itemsPerPage.value, user.token).then((response) => {
        reservations.value = response
        console.log(reservations.value);

        totalReservations.value = reservations.value.length - 1
    }).catch((error) => {
        console.log(error)
    })

}

const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
}

const handlePageChange = async (newPage) => {
    currentPage.value = newPage
    await getReservationsData()
}

const editReservation = (reservation) => {
    Object.assign(reservationToEdit, reservation)
    editModalVisible.value = true
}


const viewReservation = (reservation) => {
    selectedReservation.value = reservation
    showReservationModal.value = true
}


</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>