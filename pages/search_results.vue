<template>
    <div class="py-24 md:py-32 px-5 md:px-10 lg:px-20">
        <h1 class="text-2xl font-semibold mb-6">Available Cars {{ location }} {{ start }} {{ end }}</h1>

        <!-- <div v-if="loading" class="text-center text-gray-500">
            Loading cars...
        </div>

        <div v-else-if="cars.length === 0" class="text-center text-gray-500">
            No cars found for selected criteria.
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="car in cars" :key="car.id" class="border p-4 rounded-xl shadow bg-white">
                <h2 class="text-lg font-bold">{{ car.name }}</h2>
                <p class="text-gray-500">{{ car.category }}</p>
                <p class="text-sm mt-2">{{ car.description }}</p>
                <p class="mt-2 font-semibold text-[#00BEA1]">${{ car.daily_rate?.value?.toFixed(2) }}</p>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { searchAvailablesVehicles } from '@/composables/vehicles'

const route = useRoute()
const cars = ref([])
const loading = ref(true)
const { location, start, end } = route.query
const formattedStart = new Date(start).toISOString()
const formattedEnd = new Date(end).toISOString()

onMounted(async() => {
  await fetchAvailableCars()
})

const fetchAvailableCars = async () => {
    loading.value = true
    let data = {
        pickup_location_id: location,
        pickup_date : formattedStart,
        return_date : formattedEnd
    }
    console.log(data);
    
    await searchAvailablesVehicles(data).then((response) => {
        console.log(response);
        cars.value = response.data
        console.log(cars.value);
        
    }).catch((error) => {
        console.log(error)
    }) .finally(() => {
        loading.value = false
    })


}

</script>
