<template>
      <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-select v-model="modelValue.status" placeholder="Select status" size="large">
          <el-option v-for="status in ['Pending', 'Confirmed', 'Cancelled']" :key="status" :label="status"
            :value="status" />
        </el-select>
      </el-form>
</template>
<script setup>
const props = defineProps({ modelValue: Object })
</script>