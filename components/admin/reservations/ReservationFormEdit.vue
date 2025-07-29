<template>
      <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-select v-model="modelValue.status" placeholder="Select status" size="large">
          <el-option v-for="status in status" :key="status.label" :label="status.label" :value="status.value" />
        </el-select>
      </el-form>
</template>
<script setup>
const props = defineProps({ modelValue: Object })
const status = [{
  label: 'Pending',
  value: 'pending'
}, {
  label: 'Confirmed',
  value: 'confirmed'
}, {
  label: 'Cancelled',
  value: 'cancelled'  
}]
</script>