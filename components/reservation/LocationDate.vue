<template>
    <div class="flex flex-col items-center my-16 space-y-10">
        <!-- Location -->
        <div class="flex flex-col gap-1 items-start">
            <div>Pick-up and Drop-off location</div>
                <ClientOnly>
                    <el-autocomplete v-model="search" :fetch-suggestions="querySearch" placeholder="Search a Location"
                        :popper-append-to-body="false" :teleport="false" @select="handleSelect"
                        :class="{ 'has-error': errorSearch }" />
                </ClientOnly>
            <p v-if="errorSearch" class="text-red-500 text-sm mt-1">Please select a location.</p>
        </div>

        <!-- Dates -->
        <div class="flex flex-col gap-1 items-start">
            <div>Dates</div>
            <ClientOnly>
                <el-date-picker v-model="dates" type="daterange" start-placeholder="Start date"
                    end-placeholder="End date" size="large" :append-to-body="false" :teleport="false"
                    :class="{ 'has-error': errorDates }" />
            </ClientOnly>
            <p v-if="errorDates" class="text-red-500 text-sm mt-1">Please select rental dates.</p>
        </div>
    </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
const search = ref('')
const dates = ref([])
const errorSearch = ref(false)
const errorDates = ref(false)
const locations = [
    { value: 'Airport Plaza, George Town' },
]

const getFormData = () => ({
  location: search.value,
  dates: dates.value
})

const querySearch = (queryString, cb) => {
    const results = queryString
        ? locations.filter(loc =>
            loc.value.toLowerCase().includes(queryString.toLowerCase())
        )
        : locations
    cb(results)
}

const handleSelect = (item) => {
    search.value = item.value
}

const validateForm = async () => {
    errorSearch.value = !search.value
    errorDates.value = !(Array.isArray(dates.value) && dates.value.length === 2)
    return !errorSearch.value && !errorDates.value
}

defineExpose({ validateForm, getFormData })
</script>

<style scoped>
::v-deep(.el-input__wrapper) {
  @apply rounded-lg h-12 w-[410px];
}
.has-error :deep(.el-input__wrapper),
.has-error :deep(.el-range-editor) {
    border-color: #f87171 !important;
    /* red-400 */
    box-shadow: 0 0 0 1px #f87171 !important;
}
</style>
