<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <!-- Personal Info -->
        <el-form-item label="First Name">
            <el-input v-model="modelValue.profile.first_name" size="large" />
        </el-form-item>
        <el-form-item label="Last Name">
            <el-input v-model="modelValue.profile.last_name" size="large" />
        </el-form-item>
        <el-form-item label="Phone">
            <MazPhoneNumberInput v-model="modelValue.profile.phone_number" show-code-on-list
                :preferred-countries="['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'ES', 'IT']" class="w-full" />
        </el-form-item>
        <el-form-item label="Birthdate">
            <el-date-picker v-model="modelValue.personal_info.date_of_birth" type="date" size="large" style="width: 100%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Select or type a date" clearable />
        </el-form-item>
        <el-form-item label="Gender">
            <el-select v-model="modelValue.personal_info.gender" placeholder="Select gender" size="large">
                <el-option label="Male" value="male" />
                <el-option label="Female" value="female" />
            </el-select>
        </el-form-item>

        <el-form-item label="Email">
            <el-input v-model="modelValue.email" type="email" size="large" />
        </el-form-item>
        
        <el-form-item label="Role">
            <el-select v-model="modelValue.role" placeholder="Select role" size="large">
                <el-option label="Admin" value="admin" />
                <el-option label="Manager" value="manager" />
                <el-option label="Staff" value="staff" />
                <el-option label="Customer" value="customer" />
            </el-select>
        </el-form-item>

        <el-form-item label="Status">
            <el-select v-model="modelValue.status" placeholder="Select status" size="large">
                <el-option label="Active" value="active" />
                <el-option label="Inactive" value="inactive" />
                <el-option label="Suspended" value="suspended" />
                <el-option label="Pending" value="pending" />
            </el-select>
        </el-form-item>

        <!-- License Info -->
        <el-form-item label="License Number">
            <el-input v-model="modelValue.license_info.number" size="large" />
        </el-form-item>
                <!-- País de la licencia -->
        <el-form-item label="License Country">
            <el-select v-model="modelValue.license_info.country" placeholder="Select country" filterable size="large">
                <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
            </el-select>
        </el-form-item>
        <el-form-item label="License State">
            <el-input v-model="modelValue.license_info.state" size="large" />
        </el-form-item>
        <el-form-item label="License Class">
            <el-select v-model="modelValue.license_info.class" placeholder="Select license class" size="large">
                <el-option label="A" value="a" />
                <el-option label="B" value="b" />
                <el-option label="C" value="c" />
                <el-option label="D" value="d" />
            </el-select>
        </el-form-item>

        <el-form-item label="Expiry Date">
            <el-date-picker v-model="modelValue.license_info.expiry_date" type="date" size="large" style="width: 100%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Select or type a date" clearable  />
        </el-form-item>

    </el-form>
</template>

<script setup>
import { getAllCountries } from "@/utils/index";
const countries = ref([]);

onMounted(() => {
    getCountry()
})

const getCountry = () => {
    getAllCountries()
        .then(response => {
            countries.value = response
        })
        .catch(error => {
            console.error(error)
        })
}
defineProps({ modelValue: Object })
</script>
