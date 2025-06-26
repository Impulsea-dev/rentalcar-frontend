<template>
  <el-form label-position="top" class="grid md:grid-cols-3 gap-6 p-4">
    <el-form-item label="Daily Rate">
      <el-input-number v-model="modelValue.daily_rate.value" :min="0" :step="1" >
         <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Weekly Rate">
      <el-input-number v-model="modelValue.weekly_rate.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
      </el-input-number>
    </el-form-item>

    <el-form-item label="Monthly Rate">
      <el-input-number v-model="modelValue.monthly_rate.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Deposit Amount">
      <el-input-number v-model="modelValue.deposit_amount.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Insurance Amount">
      <el-input-number v-model="modelValue.insurance_amount.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>
  </el-form>
</template>

<script setup>
defineProps({
  modelValue: Object
})
</script>
