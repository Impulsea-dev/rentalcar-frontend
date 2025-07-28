<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Customer">
            <el-autocomplete v-model="customerInput" :fetch-suggestions="fetchCustomers" placeholder="Search customer"
                @select="onCustomerSelect" size="large" />
        </el-form-item>
        <el-form-item label="Vehicle">
            <el-autocomplete v-model="vehicleInput" :fetch-suggestions="fetchVehicles" placeholder="Search vehicle"
                @select="onVehicleSelect" size="large" />
        </el-form-item>

        <el-form-item label="Pickup Date">
            <el-date-picker v-model="modelValue.pickup_date" type="datetime" style="width: 100%;" size="large" />
        </el-form-item>

        <el-form-item label="Return Date">
            <el-date-picker v-model="modelValue.return_date" type="datetime" style="width: 100%;" size="large" />
        </el-form-item>

        <el-form-item label="Pickup Location">
            <el-autocomplete v-model="locationName" :fetch-suggestions="fetchLocations" placeholder="Search location"
                @select="onLocationSelect" size="large" />
        </el-form-item>

        <el-form-item label="Return Location">
            <el-autocomplete v-model="locationName" :fetch-suggestions="fetchLocations" placeholder="Search location"
                @select="onLocationSelect" size="large" />
        </el-form-item>

        <el-form-item label="Daily Rate ($)">
            <el-input-number v-model="modelValue.daily_rate.value" :min="0" :step="1" size="large" style="width: 100%;" />
        </el-form-item>

        <el-form-item label="Deposit ($)">
            <el-input-number v-model="modelValue.deposit.value" :min="0" :step="1" size="large" style="width: 100%;" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({ modelValue: Object })
import { getVehicles } from '@/composables/vehicles'
import { getUsers } from '@/composables/users'
import { getLocations } from '@/composables/locations'

const customerInput = ref('')
const vehicleInput = ref('')
const locationName = ref('')
const user = JSON.parse(localStorage.getItem('auth'))

const fetchCustomers = async (query, cb) => {
    await getUsers(1, 10, query, '', 'customer', user.token).then((response) => {
        const results = response.users.map(item => ({ value: item.first_name + ' ' + item.last_name, id: item.id }))
        cb(results)
    }).catch((error) => {
        console.log(error)
    })
}

const fetchVehicles = async (query, cb) => {
    await getVehicles(1, 10, '', query, '', '').then((response) => {
        const results = response.data.items.map(item => ({ value: item.model + ' ' + item.color + ' ' + item.year, id: item.id }))
        cb(results)
    }).catch((error) => {
        console.log(error)
    })
}

const fetchLocations = async (query, cb) => {
    await getLocations(1, 10, 'main_office').then((response) => {
        const results = response.data.map(item => ({ value: item.name, id: item.id }))
        cb(results)
    }).catch((error) => {
        console.log(error)
    })
}

function onCustomerSelect(item) {
    props.modelValue.customer_id = item.id
}
function onVehicleSelect(item) {
    props.modelValue.vehicle_id = item.id
}

function onLocationSelect(item) {
    props.modelValue.pickup_location_id = item.id
    props.modelValue.return_location_id = item.id
}

watch(() => props.modelValue.daily_rate.value, (val) => {
  props.modelValue.daily_rate.amount = Math.round(val * 100);
});

watch(() => props.modelValue.deposit.value, (val) => {
  props.modelValue.deposit.amount = Math.round(val * 100);
});
</script>
