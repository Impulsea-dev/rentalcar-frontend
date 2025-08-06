<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4 py-4">
        <el-form-item label="License Number" prop="license_info.license_number">
            <el-input v-model="user.license_info.number" size="large" />
        </el-form-item>

        <el-form-item label="Issuing Country" prop="license_info.country">
            <el-select v-model="user.license_info.country" placeholder="Select country" filterable size="large">
                <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
            </el-select>
        </el-form-item>

        <el-form-item label="Expiration Date" prop="license_info.expiration_date">
            <el-date-picker v-model="user.license_info.expiry_date" type="date" size="large" style="width: 100%;"
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="Select expiration date" clearable />
        </el-form-item>

        <el-form-item label="License Class">
            <el-select v-model="user.license_info.class" placeholder="Select license class" size="large">
                <el-option label="A" value="a" />
                <el-option label="B" value="b" />
                <el-option label="C" value="c" />
                <el-option label="D" value="d" />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { getAllCountries } from "@/utils/index";
const props = defineProps({ user: Object });
const countries = ref([]);
const rules = {
    'license_info.number': [{ required: true, message: 'License number is required', trigger: 'blur' }],
    'license_info.country': [{ required: true, message: 'Issuing country is required', trigger: 'change' }],
    'license_info.expiry_date': [{ required: true, message: 'Expiration date is required', trigger: 'change' }],
};

onMounted(() => {
    getAllCountries()
        .then(response => {
            countries.value = response;
        })
        .catch(error => {
            console.error(error);
        });
});
</script>
