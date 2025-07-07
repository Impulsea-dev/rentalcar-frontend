<template>
  <section class="p-6 mt-32">

    <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
      <el-tab-pane label="Vehicles" name="vehicles">
        <AdminVehicles />
      </el-tab-pane>
      <el-tab-pane label="Reservations" name="reservations">
        <Reservations />
      </el-tab-pane>
      <!-- <el-tab-pane label="New Vehicle" name="new-vehicle">
          <AdminVehicleForm />
        </el-tab-pane> -->
      <el-tab-pane label="Promotions" name="promotions">
        <AdminPromotions />
      </el-tab-pane>
      <el-tab-pane label="Users" name="users">
        <Users />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'logged-layout'
})
import { ref } from 'vue'
import Reservations from '@/components/admin/reservations/index.vue'
import Users from '@/components/admin/users/index.vue'

const activeTab = ref('reservations')
</script>
<style></style>
