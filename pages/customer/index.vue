<template>
  <section class="p-6 mt-32">

    <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
      <el-tab-pane label="My Reservations" name="myreservations">
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'logged-layout'
})
const activeTab = ref('myreservations')
</script>
<style></style>
