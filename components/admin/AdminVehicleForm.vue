<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Brand">
      <el-input v-model="form.brand" />
    </el-form-item>
    <el-form-item label="Model">
      <el-input v-model="form.model" />
    </el-form-item>
    <el-form-item label="Price">
      <el-input-number v-model="form.price" :min="0" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  brand: '',
  model: '',
  price: 0
})

const submitForm = () => {
  console.log('Sending to API', form.value)
  // Aquí iría un axios.post o put
}
</script>
