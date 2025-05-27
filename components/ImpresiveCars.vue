<template>
  <section class="flex flex-col items-center justify-center bg-[#F5F5F5] text-black">
    <div class="flex flex-col items-center gap-10 my-20 md:my-40 px-4">
      <!-- Título -->
      <h2 class="text-3xl md:text-5xl text-center font-semibold">
        Our Impressive Collection of Cars
      </h2>

      <!-- Descripción -->
      <p class="text-lg max-w-3xl text-center">
        Ranging from elegant sedans to powerful sports cars, all carefully selected to provide our customers with the ultimate driving experience.
      </p>

      <!-- Tabs -->
      <div class="overflow-auto h-16 w-[22rem] sm:w-[36rem] md:w-auto">
        <div class="flex flex-row gap-x-3 md:gap-x-6">
          <span
            v-for="tab in tabs"
            :key="tab"
            @click="tabSelected = tab"
            class="text-base md:text-lg font-normal rounded-full px-5 py-3 whitespace-nowrap transition-all duration-300 hover:text-white hover:bg-primary hover:cursor-pointer"
            :class="tabSelected === tab ? 'text-white bg-primary' : 'text-black bg-white'"
          >
            {{ tab }}
          </span>
        </div>
      </div>

      <!-- Grid de Autos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 w-full max-w-7xl">
        <CarItem
          v-for="car in filteredCars"
          :key="car.name"
          :car="car"
        />
        <p
          v-if="filteredCars.length === 0"
          class="col-span-full text-center text-gray-500 italic mt-10"
        >
          No cars available in this category.
        </p>
      </div>

      <!-- Botón CTA -->
      <ButtonGeneric
        :to="'/view_our_cars/1'"
        :class="'px-10 py-4 text-sm md:text-base bg-white !border-none font-normal before:bg-primary '"
      >
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
import { cars } from '@/utils/data.js'

const tabs = ref([
  'Compact',
  'Intermediate',
  'Standard',
  'Full-Size',
  'Compact-SUV',
  'Standard-SUV',
  'Passenger Van',
  'Pickup Truck'
])

const tabSelected = ref('Compact')



const filteredCars = computed(() => {
  return cars.filter(car => car.type.includes(tabSelected.value))
})
</script>
