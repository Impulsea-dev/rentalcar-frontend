<template>
  <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
    <!-- Blacklist -->
    <el-form-item label="Is Blacklisted">
      <el-switch v-model="modelValue.blacklist_status.is_blacklisted" />
    </el-form-item>
    <el-form-item label="Blacklist Reason" v-if="modelValue.blacklist_status.is_blacklisted">
      <el-input v-model="modelValue.blacklist_status.reason" type="textarea" />
    </el-form-item>

    <!-- Preferred Locations -->
    <el-form-item label="Preferred Locations" size="large">
      <el-select v-model="modelValue.preferred_locations" multiple placeholder="Select locations">
        <el-option label="New York" value="ny" />
        <el-option label="Los Angeles" value="la" />
        <el-option label="Chicago" value="chi" />
        <!-- Agrega más opciones reales -->
      </el-select>
    </el-form-item>

    <!-- Special Requests -->
    <el-form-item label="Special Requests" size="large">
      <el-select v-model="modelValue.special_requests" multiple placeholder="Select requests">
        <el-option label="Child Seat" value="child_seat" />
        <el-option label="GPS" value="gps" />
        <el-option label="Extra Luggage" value="extra_luggage" />
      </el-select>
    </el-form-item>

    <!-- Profile -->
    <el-form-item label="Bio">
      <el-input v-model="modelValue.profile.bio" type="textarea" size="large" />
    </el-form-item>
  </el-form>
</template>

<script setup>
defineProps({ modelValue: Object })
</script>
