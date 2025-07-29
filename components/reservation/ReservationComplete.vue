<template>
  <div class="mx-auto px-4 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10" v-if="vehicle">
      <!-- Sección izquierda: Imagen e info del auto + Especificaciones -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Imagen + info básica -->
        <div>
          <div class="relative">
            <img :src="vehicle.thumbnail?vehicle.thumbnail:'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg'" :alt="vehicle.model" class="w-full h-auto rounded-xl shadow-md mb-6" />    
            <!-- <span :class="[
              'absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-white z-10',
              car.category === 'commercial' ? 'bg-orange-500' : 'bg-green-500'
            ]"> -->
              <!-- <svg v-if="car.category === 'commercial'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4"
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

          <h1 class="text-3xl font-semibold text-gray-800 mb-2">{{ vehicle.brand_name }}</h1>

          <div class="flex items-end gap-1 mb-4">
            <span class="text-3xl font-bold text-black">${{ vehicle.daily_rate.value.toFixed(2) }}</span>
            <span class="text-base text-black/70">/day</span>
          </div>

          <!-- <div class="mb-4">
            <el-rate v-model="car.rating" disabled text-color="#ff9900" />
          </div> -->

          <div class="flex flex-wrap gap-2 mb-6">
            <el-tag type="info" round>{{ vehicle.brand_name }}</el-tag>
            <el-tag type="info" round>{{ vehicle.class }}</el-tag>
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
              <span>Bluetooth: <strong>{{ vehicle.bluetooth ? 'Yes' : 'No' }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Radio: <strong>{{ vehicle.radio ? 'Yes' : 'No' }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>Camera: <strong>{{ vehicle.camera }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>USB Ports: <strong>{{ vehicle.usb_ports }}</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <span>GPS: <strong>{{ vehicle.gps ? 'Yes' : 'No' }}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección derecha: resumen -->
      <div class="bg-white p-6 rounded-xl shadow-lg sticky top-6 h-fit">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Reservation Summary</h2>
        <div class="space-y-4 text-sm text-gray-700">
          <div>
            <p class="font-semibold">Pick-Up Date</p>
            <p>{{ formatDate(reservation.pickup_date) }}</p>
            <p>Airport Plaza, George Town</p>
          </div>

          <div>
            <p class="font-semibold">Drop-Off Date</p>
            <p>{{ formatDate(reservation.return_date) }}</p>
            <p>Airport Plaza, George Town</p>
          </div>
          <div>
            <p class="font-semibold">Total Days</p>
            <p>{{ getTotalDays(reservation.pickup_date, reservation.return_date) }} days</p>
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between font-semibold text-base">
              <span>Total:</span>
              <span>${{getTotalPrice(reservation, vehicle)}}</span>
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
import { getVehicleById } from '@/composables/vehicles'
import { getTotalDays } from '@/utils/index'

const route = useRoute()
const vehicle = ref(null)
const props = defineProps ({ reservation: Object })

onMounted(async() => {
   await getVehicleData()
})

const formatDate = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const getVehicleData = async () => {
    await getVehicleById(route.params.id).then((response) => {
        vehicle.value = response.data
    }).catch((error) => {
        console.log(error)
    })
}

const getTotalPrice = (reservation, vehicle) => {
    const rate = vehicle.daily_rate?.value || 0
    const days = getTotalDays(reservation.pickup_date, reservation.return_date)
    return (rate * days).toFixed(2)
}

</script>
