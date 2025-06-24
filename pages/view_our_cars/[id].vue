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
            <el-option v-for="brand in brandOptions" :key="brand" :label="brand.name" :value="brand.value" />
          </el-select>
        </div>

        <!-- Select de Tipo -->
        <div class="flex max-w-xs w-full">
          <el-select v-model="selectedType" placeholder="Select Type" class="w-full" size="large" @change="filterCars">
            <el-option v-for="type in typeOptions" :key="type" :label="type.name" :value="type.value" />
          </el-select>
        </div>

        <!-- Select de Orden de Precio -->
        <!-- <div class="flex max-w-xs w-full">
          <el-select v-model="selectedSort" placeholder="Sort by Price" class="w-full" size="large"
            @change="filterCars">
            <el-option v-for="sort in sortOptions" :key="sort" :label="sort" :value="sort" />
          </el-select>
        </div> -->
      </div>

      <!-- Resultados -->
      <transition name="fade" mode="out-in">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :key="currentPage">
          <CarItem v-for="car in vehicles" :car="car" :key="car.id" />
        </div>
      </transition>

      <!-- Paginación -->
      <div class="flex justify-between items-center py-20" v-if="itemsPerPage > 0">
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
import { brandOptions, typeOptions } from '@/utils/data.js'
import { getVehicles } from '@/composables/vehicles'
const route = useRoute()
const router = useRouter()
const vehicles = ref([])
const selectedBrand = ref(route.query.brand || 'Any Brand')
const selectedType = ref(route.query.type || 'Any Type')
const selectedSort = ref(route.query.sort || 'Price Low to High')
const currentPage = ref(parseInt(route.params.id) || 1)
const itemsPerPage = ref(20)
const totalCars = ref(0)
const sortOptions = ['Price Low to High', 'Price High to Low']
onMounted(() => {
  getVehiclesData()
})

const getVehiclesData = async () => {
  await getVehicles(currentPage.value, itemsPerPage.value, '', '', selectedBrand.value !== 'Any Brand' ? selectedBrand.value : '',
    selectedType.value !== 'Any Type' ? selectedType.value : ''
  ).then((response) => {
    vehicles.value = response.data.items
    itemsPerPage.value = response.data.page_size
    totalCars.value = response.data.total
  }).catch((error) => {
    console.log(error)
  })
}

const totalPages = computed(() =>
  itemsPerPage.value > 0 ? Math.ceil(totalCars.value / itemsPerPage.value) : 0
)


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


const goToPage = (page) => {
  currentPage.value = page
  updateRoute(page)
  getVehiclesData()
}


const filterCars = () => {
  currentPage.value = 1
  updateRoute(1)
  getVehiclesData()
}

// Sincronizar filtros y página con la ruta cuando cambian manualmente
watch(() => route.fullPath, () => {
  selectedBrand.value = route.query.brand || 'Any Brand'
  selectedType.value = route.query.type || 'Any Type'
  selectedSort.value = route.query.sort || 'Price Low to High'
  currentPage.value = parseInt(route.params.id) || 1
  getVehiclesData()
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