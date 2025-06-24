<template>
  <div>
    <el-table :data="promotions" style="width: 100%">
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="discount" label="Discount %" />
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="small" @click="editPromotion(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const promotions = ref([
  { title: 'Weekend Special', discount: 15 },
  { title: 'Summer Deal', discount: 10 },
])

const editPromotion = (promo) => {
  console.log('Edit promo', promo)
}
</script>
