<template>
  <el-form label-position="top" class="grid md:grid-cols-3 gap-6 p-4">
    <el-form-item label="Daily Rate" v-if="modelValue.daily_rate">
      <el-input-number v-model="modelValue.daily_rate.value" :min="0" :step="1" >
         <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Weekly Rate" v-if="modelValue.weekly_rate">
      <el-input-number v-model="modelValue.weekly_rate.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
      </el-input-number>
    </el-form-item>

    <el-form-item label="Monthly Rate" v-if="modelValue.monthly_rate">
      <el-input-number v-model="modelValue.monthly_rate.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Deposit Amount" v-if="modelValue.deposit_amount">
      <el-input-number v-model="modelValue.deposit_amount.value" :min="0" :step="1" >
          <template #prefix>
        <span>$</span>
      </template>
        </el-input-number>
    </el-form-item>

    <el-form-item label="Insurance Amount" v-if="modelValue.insurance_amount">
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
