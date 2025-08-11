<template>
    <div class="py-24 md:py-32 px-5 md:px-10 lg:px-20">
        <div class="flex items-center justify-between mb-6 gap-4">
            <h1 class="text-2xl font-semibold">Available Cars <span class="text-gray-500">({{ totalVehicles }})</span>
            </h1>

            <div class="flex items-center gap-3">
                <el-select v-model="sortBy" placeholder="Sort by" size="large" style="width: 220px;">
                    <el-option label="Sort Price" value="none" />
                    <el-option label="Price: Low → High" value="price_asc" />
                    <el-option label="Price: High → Low" value="price_desc" />
                </el-select>
            </div>
        </div>

        <div v-if="loading" class="text-center text-gray-500">
            Loading cars...
        </div>

        <div v-else-if="vehicles.length === 0" class="text-center text-gray-500">
            No cars found for selected criteria.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CarItem v-for="item in paginatedVehicles" :key="item.vehicle?.id || item.id || item._uid"
                :car="item.vehicle" />
        </div>

        <div class="mt-6 flex justify-between items-center" v-if="totalVehicles > 0">
            <!-- Selector de cantidad a la izquierda -->
            <el-pagination v-model:page-size="pageSize" :page-sizes="pageSizes" :total="totalVehicles" layout="sizes"
                background @size-change="handleSizeChange" />

            <!-- Paginador a la derecha -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="totalVehicles"
                layout="total, prev, pager, next, jumper" background @current-change="handlePageChange" />
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchAvailablesVehicles } from '@/composables/vehicles'
import CarItem from '@/components/CarItem.vue'

definePageMeta({
    middleware: ['layout-auth-client'],
})

// route & query
const route = useRoute()
const { location, start, end } = route.query

// state
const vehicles = ref([])
const loading = ref(true)

const currentPage = ref(1)
const pageSize = ref(20)
const pageSizes = [10, 20, 50]
const sortBy = ref('none')

const formattedStart = start ? new Date(start).toISOString() : null
const formattedEnd = end ? new Date(end).toISOString() : null

const fetchAvailableCars = async () => {
    loading.value = true
    try {
        const data = {
            pickup_location_id: location,
            pickup_date: formattedStart,
            return_date: formattedEnd
        }
        const response = await searchAvailablesVehicles(data)
        vehicles.value = response.data?.available_vehicles || []
    } catch (err) {
        console.error('fetchAvailableCars error', err)
        vehicles.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchAvailableCars()
})

const getPrice = (item) => {
    const v = item.vehicle
    const v1 = v.daily_rate.value
    if (typeof v1 === 'number') return v1
    return 0
}

const sortedVehicles = computed(() => {
    if (!vehicles.value || vehicles.value.length === 0) return []
    const copy = [...vehicles.value]
    if (sortBy.value === 'price_asc') {
        return copy.sort((a, b) => getPrice(a) - getPrice(b))
    } else if (sortBy.value === 'price_desc') {
        return copy.sort((a, b) => getPrice(b) - getPrice(a))
    }
    return copy
})

const totalVehicles = computed(() => vehicles.value.length)
const paginatedVehicles = computed(() => {
    const startIdx = (currentPage.value - 1) * pageSize.value
    return sortedVehicles.value.slice(startIdx, startIdx + pageSize.value)
})

const handleSizeChange = (size) => {
    pageSize.value = size
    currentPage.value = 1
}

const handlePageChange = (page) => {
    currentPage.value = page
}

watch(sortBy, () => {
    currentPage.value = 1
})

watch(vehicles, () => {
    currentPage.value = 1
})
</script>
