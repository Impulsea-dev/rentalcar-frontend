<template>
  <section class="flex flex-col items-center justify-center bg-[#F5F5F5] text-black">
    <div class="flex flex-col items-center gap-10 my-20 md:my-40 px-4">
      <!-- Título -->
      <h2 class="text-3xl md:text-5xl text-center font-semibold">
        Our Impressive Collection of Cars
      </h2>

      <!-- Descripción -->
      <p class="text-lg max-w-3xl text-center">
        Ranging from elegant sedans to powerful sports cars, all carefully selected to provide our customers with the
        ultimate driving experience.
      </p>

      <!-- Tabs -->
      <div class="overflow-auto h-16 w-[22rem] sm:w-[36rem] md:w-auto">
        <div class="flex flex-row gap-x-3 md:gap-x-6">
          <span v-for="tab in typeOptionsShort" :key="tab" @click="typeSelected = tab.value"
            class="text-base md:text-lg font-normal rounded-full px-5 py-3 whitespace-nowrap transition-all duration-300 hover:text-white hover:bg-economy hover:cursor-pointer"
            :class="typeSelected === tab.value ? 'text-white bg-economy' : 'text-black bg-white'">
            {{ tab.name }}
          </span>
        </div>
      </div>

      <!-- Grid de Autos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full max-w-7xl">
        <template v-if="isLoading">
          <div v-for="i in 3" :key="i" class="animate-pulse flex flex-col gap-4 bg-white rounded-xl shadow">
            <div class="h-60 bg-gray-300 rounded-t-md w-full"></div>
           <div class="p-2 flex flex-col space-y-2">
             <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/4"></div>
           </div>
          </div>
        </template>
        <template v-else>
          <CarItem v-for="car in vehicles" :key="car.name" :car="car" />
          <p v-if="vehicles.length === 0" class="col-span-full text-center text-gray-500 italic mt-10">
            No cars available in this category.
          </p>
        </template>
      </div>



      <!-- Botón CTA -->
      <ButtonGeneric :to="'/view_our_cars/1'"
        :class="'px-10 py-4 text-sm md:text-base bg-white !border-none font-normal before:bg-economy '">
        <div class="flex items-center gap-x-2">
          See All Cars
          <iconRight />
        </div>
      </ButtonGeneric>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import iconRight from './icon/icon-right.vue'
import CarItem from './CarItem.vue'
import ButtonGeneric from './ButtonGeneric.vue'
import { typeOptionsShort } from '@/utils/data'
import { getVehicles } from '@/composables/vehicles'

const typeSelected = ref('f95923f5-64b8-4b4a-a060-67b23adbfe3b')
const vehicles = ref([])
const isLoading = ref(false)

onMounted(async () => {
  await getVehiclesData()
})

watch(typeSelected, (newVal) => {
  getVehiclesData()
})

const getVehiclesData = async () => {
  isLoading.value = true
  await getVehicles(1, 6, '', '', '', typeSelected.value).then((response) => {
    vehicles.value = response.data.items
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    isLoading.value = false
  })
}

</script>
