<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Additional Drivers">
            <el-input-number v-model="modelValue.preferences.additional_drivers" :min="0" size="large" class="w-full" />
        </el-form-item>

        <el-form-item label="Child Seats">
            <el-input-number v-model="modelValue.preferences.child_seats" :min="0" size="large" class="w-full" />
        </el-form-item>

        <el-form-item>
            <el-checkbox v-model="modelValue.preferences.gps" label="Include GPS" />
        </el-form-item>

        <el-form-item>
            <el-checkbox v-model="modelValue.preferences.insurance" label="Include Insurance" />
        </el-form-item>

        <el-form-item label="Special Requests">
            <el-select v-model="modelValue.preferences.special_requests" multiple placeholder="Add any requests"
                size="large" class="w-full">
                <el-option label="Early pickup at 8:00 AM" value="Early pickup at 8:00 AM" />
                <el-option label="Late drop-off at 6:00 PM" value="Late drop-off at 6:00 PM" />
                <el-option label="No smoking vehicle" value="No smoking vehicle" />
            </el-select>
        </el-form-item>

    </el-form>
</template>
<script setup>
const props = defineProps({ modelValue: Object })
</script>