<template>
  <section class="p-6 mt-32">

      <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
        <el-tab-pane label="Vehicles" name="vehicles">
          <AdminVehicles />
        </el-tab-pane>
        <!-- <el-tab-pane label="New Vehicle" name="new-vehicle">
          <AdminVehicleForm />
        </el-tab-pane> -->
        <el-tab-pane label="Promotions" name="promotions">
          <AdminPromotions />
        </el-tab-pane>
        <el-tab-pane label="Users" name="users">
          <span>Hola</span>
        </el-tab-pane>
      </el-tabs>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('vehicles')
</script>
<style>

</style>
