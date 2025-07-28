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
        <Promotions />
      </el-tab-pane>
      <el-tab-pane label="Users" name="users">
        <Users />
      </el-tab-pane>
      <el-tab-pane label="Locations" name="locations">
        <Locations />
      </el-tab-pane>
      <!-- <el-tab-pane label="Companies" name="companies">
        <Companies/>
      </el-tab-pane> -->

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
import Locations from '@/components/admin/locations/index.vue'
import Promotions from '@/components/admin/promotions/index.vue'
import Companies from '@/components/superadmin/companies/index.vue'

const activeTab = ref('vehicles')
</script>
<style></style>
