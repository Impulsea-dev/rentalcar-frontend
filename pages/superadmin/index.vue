<template>
  <section class="p-6 mt-32">

    <el-tabs v-model="activeTab" type="border-card" class="demo-tabs">
      <el-tab-pane label="Companies" name="companies">
        <Companies />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'logged-layout'
})
import Companies from '@/components/superadmin/companies/index.vue'

const activeTab = ref('companies')
</script>
<style></style>
