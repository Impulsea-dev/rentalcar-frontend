<template>
  <div
    class="flex flex-row justify-center items-center gap-10 bg-secondary pt-6 py-4 px-4 mx-10 md:mx-20 2xl:mx-80 rounded-lg flex-wrap">
    <div class="flex flex-col gap-1 items-start">
      <div>Pick-up and Drop-off location</div>
      <div class="relative w-72">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          <IconLocation class="size-4 text-gray-400" />
        </div>
        <ClientOnly>
          <el-autocomplete v-model="search" :fetch-suggestions="querySearch" placeholder="Search a Location"
            :popper-append-to-body="false" :teleport="false" @select="handleSelect"
            :class="{ 'has-error': errorSearch }" />
        </ClientOnly>
      </div>
      <p class="text-red-500 text-sm min-h-[12px]">
        <span v-if="errorSearch">Please select a location.</span>
      </p>
    </div>

    <div class="flex flex-col gap-1 items-start">
      <div>Dates</div>
      <ClientOnly>
        <el-date-picker v-model="dates" type="daterange" start-placeholder="Start date" end-placeholder="End date"
          size="large" :append-to-body="false" :teleport="false" :class="{ 'has-error': errorDates }" />
      </ClientOnly>
      <p class="text-red-500 text-sm min-h-[12px]">
        <span v-if="errorDates">Please select rental dates.</span>
      </p>
    </div>

    <button @click="handleFind"
      class="flex items-center gap-x-2 rounded-full px-6 py-3 text-base bg-economy text-white hover:bg-economy/80 transition-all duration-300">
      Find a Vehicle
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import IconLocation from '@/components/icons/IconLocation.vue'

const router = useRouter()
const dates = ref<any>(null)
const search = ref<string>('')
const locations = [
  { value: 'Airport Plaza, George Town' },
]
const errorSearch = ref(false)
const errorDates = ref(false)

watch(dates, (newVal) => {
  if (newVal && newVal.length === 2) {
    errorDates.value = false
  }
})

const querySearch = (queryString: string, cb: (results: any[]) => void) => {
  const results = locations.filter(loc => loc.value.toLowerCase().includes(queryString.toLowerCase()))
  cb(results)
}

const handleSelect = (item: any) => {
  search.value = item.value
  errorSearch.value = false
}

const handleFind = () => {
  errorSearch.value = !search.value
  errorDates.value = !dates.value || dates.value.length !== 2
  if (!errorSearch.value && !errorDates.value) {
    // navigate with query params
    router.push({ path: '/view_our_cars/1', query: { location: search.value, start: dates.value[0], end: dates.value[1] } })
  }
}
</script>

<style scoped>
::v-deep(.el-input__wrapper) {
  @apply rounded-lg border bg-white text-black h-12;
}

::v-deep(.el-input__inner) {
  @apply text-sm placeholder-gray-400 ps-6;
}

::v-deep(.el-date-editor) {
  @apply w-72 p-3 text-sm border rounded-lg bg-white placeholder-red-500 text-black h-12 ps-4;
}

::v-deep(.el-range-input::placeholder) {
  @apply text-gray-400;
}

::v-deep(.el-input__icon) {
  @apply text-gray-400;
}

/* Error state for Autocomplete */
::v-deep(.has-error .el-input__wrapper) {
  @apply border-red-500;
}

/* Error state for DatePicker: apply when .has-error is on the same wrapper */
::v-deep(.el-date-editor.has-error) {
  @apply border-red-500;
}
</style>
