<template>
  <div class="mx-auto px-4 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Sección izquierda: Imagen e info del auto + Especificaciones -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Imagen + info básica -->
        <div>
          <div class="relative">
            <img :src="car.image" :alt="car.name" class="w-full h-auto rounded-xl shadow-md mb-6" />
            <span :class="[
              'absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-white z-10',
              car.category === 'commercial' ? 'bg-orange-500' : 'bg-green-500'
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
              <span>Bluetooth: <strong>{{ car.features.bluetooth ? 'Yes' : 'No' }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Radio: <strong>{{ car.features.radio ? 'Yes' : 'No' }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Camera: <strong>{{ car.features.camera }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Mileage: <strong>{{ car.features.mileage }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Apple CarPlay: <strong>{{ car.features.appleCarplay ? 'Yes' : 'No' }}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección derecha: resumen -->
      <div class="bg-white p-6 rounded-xl shadow-lg sticky top-6 h-fit">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Reservation Summary</h2>

        <div class="space-y-4 text-sm text-gray-700" v-if="reservation.location.dates && reservation.location.dates.length >= 2">
          <div>
            <p class="font-semibold">Pick-Up</p>
            <p>{{ formatDate(reservation.location.dates[0]) }}</p>
            <p>{{ reservation.location.location }}</p>
          </div>

          <div>
            <p class="font-semibold">Drop-Off</p>
            <p>{{ formatDate(reservation.location.dates[1]) }}</p>
            <p>{{ reservation.location.location }}</p>
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span>${{ car.price}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cars } from '@/utils/data.js'
const route = useRoute()
const reservation = ref({ user: {}, location: {} })
const car = cars.find((c) => c.name === route.params.id)

onMounted(() => {
    const data = localStorage.getItem('reservationData')
    if (data) {
        reservation.value = JSON.parse(data)
    }
})

const formatDate = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // meses van de 0 a 11
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

</script>
