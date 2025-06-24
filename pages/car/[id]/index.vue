<template>
    <div class="p-8 max-w-7xl mx-auto my-32">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start" v-if="vehicle">
            <!-- Imagen + info básica -->
            <div>
                <div class="relative">
                    <img src="https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg"
                        :alt="vehicle.model" class="w-full h-auto rounded-xl shadow-md mb-6" />
                    <!-- <span :class="[
                        'absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-white z-10',
                        car.category === 'commercial' ? 'bg-primary' : 'bg-economy'
                    ]">
                        <svg v-if="car.category === 'commercial'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 17v-6h10v6m-10 0a2 2 0 1 1-4 0m4 0H7m10 0h-2m2 0a2 2 0 1 0 4 0m-4 0H17M3 10h18M5 6h14v4H5V6z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 13l1-2h16l1 2M5 10V6h14v4M5 10h14m-2 7a2 2 0 1 1-4 0m6 0a2 2 0 1 1-4 0" />
                        </svg>
                        <span>{{ car.category === 'commercial' ? 'Discount' : 'Economy' }}</span>
                    </span> -->
                </div>

                <h1 class="text-3xl font-semibold text-gray-800 mb-2">{{ vehicle.model }} {{ vehicle.year }} {{
                    vehicle.color }}</h1>

                <div class="flex items-end gap-1 mb-4">
                    <span class="text-3xl font-bold text-black">{{ vehicle.daily_rate.text }}</span>
                    <span class="text-base text-black/70">/day</span>
                </div>

                <div class="mb-4">
                    <!-- <el-rate v-model="car.rating" disabled text-color="#ff9900" /> -->
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    <el-tag type="info" round>{{ vehicle.brand_name }}</el-tag>
                    <el-tag type="info" round>{{ vehicle.class }}</el-tag>
                </div>

                <div class="flex gap-4">
                    <button class="px-4 py-2 rounded-full flex items-center text-white bg-economy hover:bg-economy/80"
                        @click="handleReservation">
                        Reserve
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Especificaciones -->
            <div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
                <ul class="space-y-2 text-gray-700">
                    <li><strong>Doors:</strong> {{ vehicle.doors }}</li>
                    <li><strong>Seats:</strong> {{ vehicle.seats }}</li>
                    <li><strong>Transmission:</strong> {{ vehicle.transmission }}</li>
                    <li><strong>Air Conditioning:</strong> {{ vehicle.air_conditioning ? 'Yes' : 'No' }}</li>
                    <li><strong>Luggage:</strong> {{ vehicle.luggage_capacity }} bags</li>
                </ul>

                <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Features</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M11 22v-7.6L6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5L11 9.6V2h1l5.7 5.7l-4.3 4.3l4.3 4.3L12 22zm2-12.4l1.9-1.9L13 5.85zm0 8.55l1.9-1.85l-1.9-1.9z" />
                        </svg>
                        <span>Bluetooth: <strong>{{ vehicle.bluetooth ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9m2.9 11.3c-2.3-2.3-2.3-6.1 0-8.5" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5m2.9-11.4C23 8.8 23 15.1 19.1 19" />
                            </g>
                        </svg>
                        <span>Radio: <strong>Yes</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 3a7 7 0 1 0 0 14a7 7 0 0 0 0-14m-9 7a9 9 0 1 1 13.148 7.989L16.805 21H19v2H5v-2h2.195l.657-3.011A9 9 0 0 1 3 10m6.74 8.714L9.243 21h5.516l-.499-2.286A9 9 0 0 1 12 19c-.78 0-1.537-.1-2.26-.286M12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0" />
                        </svg>
                        <span>Camera: <strong>{{ vehicle.backup_camera ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M17 4.5C17 5.9 15.9 7 14.5 7S12 5.9 12 4.5S13.1 2 14.5 2S17 3.1 17 4.5M15 8h-.8c-2.1 0-4.1-1.2-5.1-3.1c-.1-.1-.2-.2-.2-.3l-1.8.8c.5 1.4 2.1 3.2 4.4 4.1l-1.8 5l-3.9-1.1L3 18.9l2 .5l1.8-3.6l4.5 1.2c1 .2 2-.3 2.4-1.2L16 9.4c.2-.7-.3-1.4-1-1.4m3.9-1l-3.4 9.4c-.6 1.6-2.1 2.6-3.7 2.6c-.3 0-.7 0-1-.1l-2.9-.8l-.9 1.8l2 .5l1.4.4c.5.1 1 .2 1.5.2c2.5 0 4.7-1.5 5.6-3.9L21 7z" />
                        </svg>
                        <span>Child Seat: <strong>{{ vehicle.child_seat ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M2 12c0 .385.312.698.698.698H4.59a7.444 7.444 0 0 0 6.712 6.712v1.892a.698.698 0 0 0 1.396 0V19.41a7.444 7.444 0 0 0 6.712-6.712h1.892a.698.698 0 0 0 0-1.396H19.41a7.444 7.444 0 0 0-6.712-6.712V2.698a.698.698 0 0 0-1.396 0V4.59a7.444 7.444 0 0 0-6.712 6.712H2.698A.7.7 0 0 0 2 12m6.512 0a3.488 3.488 0 1 1 6.976 0a3.488 3.488 0 0 1-6.976 0"
                                clip-rule="evenodd" />
                            <path fill="currentColor"
                                d="M9.907 12a2.093 2.093 0 1 1 4.186 0a2.093 2.093 0 0 1-4.186 0" />
                        </svg>
                        <span>GPS: <strong>{{ vehicle.gps ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 22q-.825 0-1.412-.587T10 20q0-.525.275-.975T11 18.3V16H8q-.825 0-1.412-.587T6 14v-2.3q-.45-.225-.725-.675T5 10q0-.825.588-1.413T7 8t1.413.588T9 10q0 .575-.275 1T8 11.7V14h3V6H9l3-4l3 4h-2v8h3v-2h-1V8h4v4h-1v2q0 .825-.587 1.413T16 16h-3v2.3q.475.25.738.7T14 20q0 .825-.587 1.413T12 22" />
                        </svg>
                        <span>USB Ports: <strong>{{ vehicle.usb_ports }}</strong></span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Autos relacionados -->
        <!-- <div class="mt-16">
            <h3 class="text-xl font-semibold text-gray-800 mb-6">Related Cars</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="related in relatedCars" :key="related.name"
                    class="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
                    <img :src="related.image" :alt="related.name" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h4 class="text-lg font-semibold text-gray-800">{{ related.name }}</h4>
                        <p class="text-gray-600 mb-2">${{ related.price }} / day</p>
                        <div class="flex flex-wrap gap-1 mb-2">
                            <el-tag type="info" size="small" v-for="t in related.type" :key="t">{{ t }}</el-tag>
                            <el-tag :type="related.category === 'standard' ? 'success' : 'warning'" size="small">
                                {{ related.category }}
                            </el-tag>
                        </div>
                        <router-link :to="`/car/${related.name}`" class="text-primary hover:underline text-sm">
                            View Details →
                        </router-link>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { getVehicleById } from "@/composables/vehicles";
const route = useRoute()
const router = useRouter()
const id = route.params.id
const vehicle = ref(null)

onMounted(async () => {
    await getVehicleByIdData()
})

const getVehicleByIdData = async () => {
    await getVehicleById(id).then((response) => {
        vehicle.value = response.data
    }).catch((error) => {
        console.log(error)
    })
}





// const car = computed(() => {
//       return cars.find((c) => c.name === route.params.id)
//     // return cars[0]
// })

// const relatedCars = computed(() =>
//     cars.filter(
//         (c) => c.name !== car.value?.name && c.category === car.value?.category
//     )
// )

// const categoryColor = computed(() => {
//     return car.value?.category === 'standard' ? 'success' : 'warning'
// })

function handleReservation() {
    // alert(`Reserving ${car.value.name}`)
    router.push(`/car/${car.value.name}/reservation`)
}

function handleContact() {
    alert(`Contacting about ${car.value.name}`)
}
</script>
