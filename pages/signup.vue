<template>
  <section class="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 mt-10">
    <div class="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10">
      <h1 class="text-2xl font-bold text-center text-[#212529] mb-8">Create Your Account</h1>

      <el-form @submit.prevent="handleRegister" label-position="top" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <el-form-item label="First Name">
          <el-input v-model="form.first_name" placeholder="John" size="large" />
        </el-form-item>

        <el-form-item label="Last Name">
          <el-input v-model="form.last_name" placeholder="Doe" size="large" />
        </el-form-item>

        <el-form-item label="Phone">
          <el-input v-model="form.phone" placeholder="+1234567890" size="large" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="you@example.com" size="large" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            size="large"
            placeholder="••••••"
            suffix-icon="View"
            @suffix-icon-click="showPassword = !showPassword"
          />
        </el-form-item>

        <el-form-item label="License Number">
          <el-input v-model="form.license_info.number" placeholder="ABC-12345" size="large" />
        </el-form-item>

        <el-form-item label="License Issued Date">
          <el-date-picker
            v-model="form.license_info.issued_date"
            type="date"
            placeholder="YYYY-MM-DD"
            size="large"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="License Expiry Date">
          <el-date-picker
            v-model="form.license_info.expiry_date"
            type="date"
            placeholder="YYYY-MM-DD"
            size="large"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="License Country">
          <el-select v-model="form.license_info.country" placeholder="Select country" size="large">
            <el-option label="United States" value="US" />
            <el-option label="Canada" value="CA" />
            <el-option label="Mexico" value="MX" />
            <!-- puedes cargar más desde API si deseas -->
          </el-select>
        </el-form-item>

        <div class="md:col-span-2">
          <el-button
            type="primary"
            class="w-full !bg-[#00BEA1] hover:!bg-opacity-90"
            size="large"
            :loading="isRegistering"
            native-type="submit"
          >
            Create Account
          </el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showPassword = ref(false)
const isRegistering = ref(false)

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  license_info: {
    number: '',
    issued_date: '',
    expiry_date: '',
    country: '',
  },
})

const handleRegister = () => {
  isRegistering.value = true
}
</script>
