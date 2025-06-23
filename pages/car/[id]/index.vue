<template>
    <div class="p-8 max-w-7xl mx-auto my-32">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <!-- Imagen + info básica -->
            <div>
                <div class="relative">
                    <img :src="car.image" :alt="car.name" class="w-full h-auto rounded-xl shadow-md mb-6" />
                    <span :class="[
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
                    </span>
                </div>

                <h1 class="text-3xl font-semibold text-gray-800 mb-2">{{ car.name }}</h1>

                <div class="flex items-end gap-1 mb-4">
                    <span class="text-3xl font-bold text-black">${{ car.price }}</span>
                    <span class="text-base text-black/70">/day</span>
                </div>

                <div class="mb-4">
                    <el-rate v-model="car.rating" disabled text-color="#ff9900" />
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    <el-tag type="info" round v-for="t in car.type" :key="t">{{ t }}</el-tag>
                </div>

                <div class="flex gap-4">
                    <button class="px-4 py-2 rounded-full flex items-center text-white"
                        :class="car.category === 'standard' ? 'bg-economy hover:bg-economy/80' : 'bg-primary hover:bg-primary/80'"
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
                    <li><strong>Doors:</strong> {{ car.specs.doors }}</li>
                    <li><strong>Seats:</strong> {{ car.specs.seats }}</li>
                    <li><strong>Transmission:</strong> {{ car.specs.transmission }}</li>
                    <li><strong>Air Conditioning:</strong> {{ car.specs.airConditioning ? 'Yes' : 'No' }}</li>
                    <li><strong>Luggage:</strong> {{ car.specs.luggage }} bags</li>
                </ul>

                <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Features</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M11 22v-7.6L6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5L11 9.6V2h1l5.7 5.7l-4.3 4.3l4.3 4.3L12 22zm2-12.4l1.9-1.9L13 5.85zm0 8.55l1.9-1.85l-1.9-1.9z" />
                        </svg>
                        <span>Bluetooth: <strong>{{ car.features.bluetooth ? 'Yes' : 'No' }}</strong></span>
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
                        <span>Radio: <strong>{{ car.features.radio ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 3a7 7 0 1 0 0 14a7 7 0 0 0 0-14m-9 7a9 9 0 1 1 13.148 7.989L16.805 21H19v2H5v-2h2.195l.657-3.011A9 9 0 0 1 3 10m6.74 8.714L9.243 21h5.516l-.499-2.286A9 9 0 0 1 12 19c-.78 0-1.537-.1-2.26-.286M12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0" />
                        </svg>
                        <span>Camera: <strong>{{ car.features.camera }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" />
                        </svg>
                        <span>Mileage: <strong>{{ car.features.mileage }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z" />
                            <path fill="currentColor"
                                d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5" />
                        </svg>
                        <span>Apple CarPlay: <strong>{{ car.features.appleCarplay ? 'Yes' : 'No' }}</strong></span>
                    </div>

                    <div class="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none">
                                <path
                                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                <path fill="currentColor"
                                    d="M12 3c1.33 0 2.584.324 3.687.899l.606-.606a1 1 0 1 1 1.414 1.414l-.35.35A7.98 7.98 0 0 1 20 11v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a7.98 7.98 0 0 1 2.644-5.942l-.351-.35a1 1 0 0 1 1.414-1.415l.606.606A8 8 0 0 1 12 3m6 11H6v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1zm-6-9a6 6 0 0 0-5.996 5.775L6 11v1h12v-1a6 6 0 0 0-6-6M9 8a1 1 0 1 1 0 2a1 1 0 0 1 0-2m6 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
                            </g>
                        </svg>
                        <span>Android Auto: <strong>{{ car.features.androidAuto ? 'Yes' : 'No' }}</strong></span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Autos relacionados -->
        <div class="mt-16">
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
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { cars } from '@/utils/data.js'

const route = useRoute()
const router = useRouter()

const car = computed(() => {
      return cars.find((c) => c.name === route.params.id)
    // return cars[0]
})

const relatedCars = computed(() =>
    cars.filter(
        (c) => c.name !== car.value?.name && c.category === car.value?.category
    )
)

const categoryColor = computed(() => {
    return car.value?.category === 'standard' ? 'success' : 'warning'
})

function handleReservation() {
    // alert(`Reserving ${car.value.name}`)
    router.push(`/car/${car.value.name}/reservation`)
}

function handleContact() {
    alert(`Contacting about ${car.value.name}`)
}
</script>
