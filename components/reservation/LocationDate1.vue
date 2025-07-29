<template>
    <div>
        <el-form ref="locationRef" :model="modelValue" :rules="rules" label-position="top"
            class="grid grid-cols-1 gap-4 py-6 px-40">
            <!-- Location -->
            <el-form-item label="Pick-up and Drop-off location" prop="pickup_location_id">
                <ClientOnly>
                    <el-autocomplete v-model="location" :fetch-suggestions="fetchLocations"
                        placeholder="Search a Location" :popper-append-to-body="false" :teleport="false"
                        @select="handleSelect" size="large" />
                </ClientOnly>
            </el-form-item>

            <!-- Dates -->
            <el-form-item label="Dates" prop="pickup_date">
                <ClientOnly>
                    <el-date-picker v-model="dates" type="daterange" start-placeholder="Start date"
                        end-placeholder="End date" size="large" :append-to-body="false" :teleport="false" />
                </ClientOnly>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { getLocations } from '@/composables/locations'
import { ref, defineExpose, watch } from 'vue'

const props = defineProps({ modelValue: Object })
const locationRef = ref(null)

const location = ref('')
const dates = ref([])

const rules = {
    pickup_location_id: [
        { required: true, message: 'Pickup location is required', trigger: 'change' }
    ],
    pickup_date: [
        { validator: validateDates, trigger: 'change' }
    ]
}

// Custom validator for dates
function validateDates(rule, value, callback) {
    if (!dates.value || dates.value.length !== 2) {
        callback(new Error('Both pickup and return dates are required'))
    } else {
        callback()
    }
}

// Update modelValue when dates change
watch(dates, (newVal) => {
    if (newVal && newVal.length === 2) {
        props.modelValue.pickup_date = newVal[0]
        props.modelValue.return_date = newVal[1]
    } else {
        props.modelValue.pickup_date = ''
        props.modelValue.return_date = ''
    }
})

// Location selection
const fetchLocations = async (query, cb) => {
    try {
        const response = await getLocations(1, 10, 'main_office')
        const results = response.data.map(item => ({ value: item.name, id: item.id }))
        cb(results)
    } catch (error) {
        console.log(error)
    }
}

const handleSelect = (item) => {
    location.value = item.value
    props.modelValue.pickup_location_id = item.id
    props.modelValue.return_location_id = item.id
}

// Expose validation method to parent
const validateForm = async () => {
    if (locationRef.value) {
        return await locationRef.value.validate()
    }
    return false
}

defineExpose({ validateForm })
</script>
