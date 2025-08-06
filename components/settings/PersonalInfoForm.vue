<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4 py-4">
        <el-form-item label="First Name" prop="profile.first_name">
            <el-input v-model="user.profile.first_name" size="large" />
        </el-form-item>
        <el-form-item label="Last Name" prop="profile.last_name">
            <el-input v-model="user.profile.last_name" size="large" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
            <el-input v-model="user.email" type="email" size="large" />
        </el-form-item>
        <el-form-item label="Country" prop="profile.country">
            <el-select v-model="user.profile.country" placeholder="Select country" filterable size="large">
                <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
            </el-select>
        </el-form-item>
        <el-form-item label-position="top">
            <template #label>
                <label class="text-sm text-gray-700 font-medium">Phone
                </label>
            </template>
            <div class="w-full">
                <MazPhoneNumberInput v-model="user.profile.phone_number" show-code-on-list
                    :preferred-countries="['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'ES', 'IT']"  class="w-full max-w-full !min-w-0"   />
            </div>
        </el-form-item>
        <el-form-item label="Birthdate">
            <el-date-picker v-model="user.personal_info.date_of_birth" type="date" size="large" style="width: 100%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Select or type a date" clearable />
        </el-form-item>
    </el-form>
</template>
<script setup>
import { getAllCountries } from "@/utils/index";

const props = defineProps({ user: Object })
const rules = {
    'profile.first_name': [{ required: true, message: 'First name is required', trigger: 'blur' }],
    'profile.last_name': [{ required: true, message: 'Last name is required', trigger: 'blur' }],
    email: [{ required: true, message: 'Email is required', trigger: 'blur' }],
    'profile.phone_number': [{ required: true, message: 'Phone number is required', trigger: 'blur' }],
}
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
</script>
