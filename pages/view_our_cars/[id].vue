<template>
  <div>
    <section class="flex flex-col py-24 md:py-32 px-5 md:px-10 lg:px-20">
        <div class="flex flex-col items-center gap-10 mb-14">
          <span class="text-2xl md:text-5xl">Our Impressive Collection of Cars</span>
        </div>
      <!-- Filtros -->
      <div class="flex gap-4 mb-10 flex-wrap justify-center md:justify-start">
        <!-- Select de Marca -->
        <div class="flex max-w-xs w-full">
          <el-select v-model="selectedBrand" placeholder="Select Brand" class="w-full" size="large"
            @change="filterCars">
            <el-option v-for="brand in brandOptions" :key="brand" :label="brand" :value="brand" />
          </el-select>
        </div>

        <!-- Select de Tipo -->
        <div class="flex max-w-xs w-full">
          <el-select v-model="selectedType" placeholder="Select Type" class="w-full" size="large" @change="filterCars">
            <el-option v-for="type in typeOptions" :key="type" :label="type" :value="type" />
          </el-select>
        </div>

        <!-- Select de Orden de Precio -->
        <div class="flex max-w-xs w-full">
          <el-select v-model="selectedSort" placeholder="Sort by Price" class="w-full" size="large"
            @change="filterCars">
            <el-option v-for="sort in sortOptions" :key="sort" :label="sort" :value="sort" />
          </el-select>
        </div>
      </div>

      <!-- Resultados -->
      <transition name="fade" mode="out-in">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :key="currentPage">
          <CarItem v-for="car in currentPageCars" :car="car" :key="car.id" />
        </div>
      </transition>

      <!-- Paginación -->
      <div class="flex justify-between items-center py-20">
        <vue-awesome-paginate :total-items="totalCars" :items-per-page="itemsPerPage" :max-pages-shown="5"
          v-model="currentPage" @click="goToPage" :hide-prev-next="true" />
        <span class="text-base">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cars } from '@/utils/data.js'

const route = useRoute()
const router = useRouter()

// Filtros y paginación
const selectedBrand = ref(route.query.brand || 'Any Brand')
const selectedType = ref(route.query.type || 'Any Type')
const selectedSort = ref(route.query.sort || 'Price Low to High')
const currentPage = ref(parseInt(route.params.id) || 1)
const itemsPerPage = 4

// Opciones (pueden estar fuera si no cambian)
const brandOptions = ['Any Brand', 'Hyundai', 'SsangYoung']
const typeOptions = ['Any Type', 'Compact', 'Intermediate', 'Standard', 'Full-Size', 'Compact-SUV', 'Standard-SUV', 'Passenger Van','Pickup Truck']
const sortOptions = ['Price Low to High', 'Price High to Low']

// Filtrar autos
const filteredCars = computed(() =>
  cars.filter(car =>
    (selectedBrand.value === 'Any Brand' || car.brand === selectedBrand.value) &&
    (selectedType.value === 'Any Type' || (Array.isArray(car.type) && car.type.includes(selectedType.value)))
  )
)

// Ordenar autos
const sortedCars = computed(() => {
  const sorted = [...filteredCars.value]
  if (selectedSort.value === 'Price Low to High') sorted.sort((a, b) => a.price - b.price)
  else if (selectedSort.value === 'Price High to Low') sorted.sort((a, b) => b.price - a.price)
  return sorted
})

const totalCars = computed(() => sortedCars.value.length)
const totalPages = computed(() => Math.ceil(totalCars.value / itemsPerPage))

// Autos para la página actual
const currentPageCars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedCars.value.slice(start, start + itemsPerPage)
})

// Navegar a página o cambiar filtros actualizando ruta con query
function updateRoute(page = currentPage.value) {
  router.push({
    path: `/view_our_cars/${page}`,
    query: {
      brand: selectedBrand.value,
      type: selectedType.value,
      sort: selectedSort.value,
    }
  })
}

// Función para cambiar página
const goToPage = (page) => {
  currentPage.value = page
  updateRoute(page)
}

// Función para filtrar (reinicia a página 1)
const filterCars = () => {
  currentPage.value = 1
  updateRoute(1)
}

// Sincronizar filtros y página con la ruta cuando cambian manualmente
watch(() => route.fullPath, () => {
  selectedBrand.value = route.query.brand || 'Any Brand'
  selectedType.value = route.query.type || 'Any Type'
  selectedSort.value = route.query.sort || 'Price Low to High'
  currentPage.value = parseInt(route.params.id) || 1
}, { immediate: true })


</script>




<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: black;
  border: 1px solid black;
  color: white;
}

.active-page:hover {
  background-color: #010101;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>