<template>
    <div class="py-24 md:py-32 px-5 md:px-10 lg:px-20">
        <h1 class="text-2xl font-semibold mb-6">Available Cars {{ totalVehicles }}</h1>

        <div v-if="loading" class="text-center text-gray-500">
            Loading cars...
        </div>

        <div v-else-if="cars.length === 0" class="text-center text-gray-500">
            No cars found for selected criteria.
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" v-else>
            <CarItem v-for="car in vehicles" :car="car.vehicle" :key="car.vehicle.id" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { searchAvailablesVehicles } from '@/composables/vehicles'

const route = useRoute()
const vehicles = ref([])
const totalVehicles = ref(0)

const loading = ref(true)
const { location, start, end } = route.query
const formattedStart = new Date(start).toISOString()
const formattedEnd = new Date(end).toISOString()

onMounted(async () => {
    await fetchAvailableCars()
})

const fetchAvailableCars = async () => {
    loading.value = true
    let data = {
        pickup_location_id: location,
        pickup_date: formattedStart,
        return_date: formattedEnd
    }
    await searchAvailablesVehicles(data).then((response) => {
        vehicles.value = response.data.available_vehicles
        console.log(vehicles.value);
        totalVehicles.value = response.data.total_count

    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        loading.value = false
    })


}

</script>
