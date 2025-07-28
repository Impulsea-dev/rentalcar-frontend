<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Name">
            <el-input v-model="modelValue.name" placeholder="Name" size="large" />
        </el-form-item>
        <el-form-item label="Address">
            <el-input v-model="modelValue.address" placeholder="Address" size="large" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="Type">
            <el-select v-model="modelValue.type" placeholder="Type" size="large">
                <el-option label="Main Office" value="main_office" />
                <el-option label="Airport" value="airport" />
                <el-option label="Hotel" value="hotel " />
                <el-option label="Branch" value="branch" />
            </el-select>
        </el-form-item>
        <el-form-item label="Country">
            <el-select v-model="modelValue.location.country" placeholder="Select country" filterable size="large">
                <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
            </el-select>
        </el-form-item>
        <el-form-item label="City">
            <el-input v-model="modelValue.location.city" size="large" />
        </el-form-item>
        <el-form-item label="State">
            <el-input v-model="modelValue.location.state" size="large" />
        </el-form-item>

        <el-form-item label="Street">
            <el-input v-model="modelValue.location.street" size="large" />
        </el-form-item>

        <el-form-item label="Postal Code">
            <el-input v-model="modelValue.location.postal_code" size="large" />
        </el-form-item>

    </el-form>

</template>
<script setup>
const props = defineProps({ modelValue: Object })
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
</script>