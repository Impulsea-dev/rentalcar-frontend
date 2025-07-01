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
            <el-input v-model="locationName" readonly size="large" />
        </el-form-item>

        <el-form-item label="Return Location">
            <el-input v-model="locationName" readonly size="large" />
        </el-form-item>

        <el-form-item label="Status">
            <el-select v-model="modelValue.status" placeholder="Select status" size="large">
                <el-option label="Pending" value="pending" />
                <el-option label="Confirmed" value="confirmed" />
                <el-option label="Cancelled" value="cancelled" />
                <el-option label="Expired" value="expired" />
                <el-option label="Converted" value="converted" />
            </el-select>
        </el-form-item>

        <el-form-item label="Payment Method">
            <el-select v-model="modelValue.payment_info.method" placeholder="Select payment method" size="large">
                <el-option label="Credit Card" value="credit_card" />
                <el-option label="Debit Card" value="debit_card" />
                <el-option label="Cash" value="cash" />
                <el-option label="PayPal" value="paypal" />
                <el-option label="Bank Transfer" value="bank_transfer" />
            </el-select>
        </el-form-item>
        <el-form-item label="Insurance Options">
            <el-select v-model="modelValue.insurance" multiple placeholder="Select insurance types" size="large">
                <el-option label="Basic Coverage" value="basic" />
                <el-option label="Collision Damage Waiver" value="cdw" />
                <el-option label="Personal Accident Insurance" value="pai" />
                <el-option label="Theft Protection" value="tp" />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({ modelValue: Object })

const customerInput = ref('')
const vehicleInput = ref('')
const locationName = ref('Airport Plaza, George Town')

function fetchCustomers(query, cb) {
    const results = [
        { value: 'cus_123', label: 'John Doe' },
        { value: 'cus_456', label: 'Jane Smith' }
    ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    cb(results)
}

function fetchVehicles(query, cb) {
    const results = [
        { value: 'veh_001', label: 'Toyota Corolla' },
        { value: 'veh_002', label: 'Honda Civic' }
    ].filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    cb(results)
}

function onCustomerSelect(item) {
    props.modelValue.customer_id = item.value
}
function onVehicleSelect(item) {
    props.modelValue.vehicle_id = item.value
}


watchEffect(() => {
    props.modelValue.pickup_location = { name: locationName.value }
    props.modelValue.return_location = { name: locationName.value }
})
</script>
