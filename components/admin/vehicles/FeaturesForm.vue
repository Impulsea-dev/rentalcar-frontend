<template>
    <el-form label-position="top" class="grid md:grid-cols-3 gap-6 p-4">
        <!-- Características booleanas con checkbox -->
        <el-form-item label="GPS">
            <el-checkbox v-model="modelValue.gps">Enabled</el-checkbox>
        </el-form-item>
                <el-form-item label="Backup Camera">
            <el-checkbox v-model="modelValue.backup_camera">Enabled</el-checkbox>
        </el-form-item>

        <el-form-item label="Bluetooth">
            <el-checkbox v-model="modelValue.bluetooth">Enabled</el-checkbox>
        </el-form-item>

        <el-form-item label="Air Conditioning">
            <el-checkbox v-model="modelValue.air_conditioning">Enabled</el-checkbox>
        </el-form-item>

        <el-form-item label="Sunroof">
            <el-checkbox v-model="modelValue.sunroof">Enabled</el-checkbox>
        </el-form-item>

        <el-form-item label="Parking Sensors">
            <el-checkbox v-model="modelValue.parking_sensors">Enabled</el-checkbox>
        </el-form-item>

          <el-form-item label="Child Seat">
            <el-checkbox v-model="modelValue.child_seat">Enabled</el-checkbox>
        </el-form-item>

        <!-- Campos numéricos -->
        <el-form-item label="USB Ports">
            <el-input-number v-model="modelValue.usb_ports" :min="0" :step="1" size="large" />
        </el-form-item>

        <el-form-item label="Seats">
            <el-input-number v-model="modelValue.seats" :min="1" :step="1" size="large" />
        </el-form-item>

        <el-form-item label="Doors">
            <el-input-number v-model="modelValue.doors" :min="1" :step="1" size="large" />
        </el-form-item>

            <el-form-item label="Luggage">
            <el-input-number v-model="modelValue.luggage_capacity" :min="0" :step="1" size="large" />
        </el-form-item>
        <!-- Selects -->
         <el-form-item label="Fuel Type">
        <el-select v-model="modelValue.fuel_type" placeholder="Select fuel type" clearable size="large">
            <el-option v-for="option in fuelTypeOptions" :key="option.value" :label="option.label"
                :value="option.value" />
        </el-select>
        </el-form-item>

        <el-form-item label="Transmission">
            <el-select v-model="modelValue.transmission" placeholder="Select transmission" clearable size="large">
                <el-option v-for="option in transmissionOptions" :key="option.value" :label="option.label"
                    :value="option.value" />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup>
defineProps({
    modelValue: Object
})

const transmissionOptions = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' }
]

const fuelTypeOptions = [
    { value: 'gasoline', label: 'Gasoline' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' }
]
</script>
