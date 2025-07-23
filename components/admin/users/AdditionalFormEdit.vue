<template>
  <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
    <el-form-item label="Country">
      <el-select v-model="modelValue.profile.country" placeholder="Select country" filterable size="large">
        <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
      </el-select>
    </el-form-item>
    <el-form-item label="ID Type">
      <el-select v-model="modelValue.personal_info.id_type" placeholder="Select ID type" size="large">
        <el-option label="Passport" value="passport" />
        <el-option label="Driver's License" value="drivers_license" />
        <el-option label="ID Card" value="id_card" />
      </el-select>
    </el-form-item>
    <el-form-item label="ID Number">
      <el-input v-model="modelValue.personal_info.id_number" size="large" />
    </el-form-item>
    <el-form-item label="City">
      <el-input v-model="modelValue.profile.city" size="large" />
    </el-form-item>
    <el-form-item label="State">
      <el-input v-model="modelValue.profile.state" size="large" />
    </el-form-item>
    <el-form-item label="Postal Code">
      <el-input v-model="modelValue.profile.postal_code" size="large" />
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
