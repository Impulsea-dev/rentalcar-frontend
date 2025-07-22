<template>
  <section class="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
    <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
      <!-- Left (benefits) -->
      <div class="hidden md:flex flex-col justify-center items-start gap-6 p-10 bg-[#00BEA1] text-white">
        <h2 class="text-2xl font-extrabold text-white">Why choose us?</h2>
        <ul class="space-y-4">
          <li v-for="bene in benefits" :key="bene.title" class="flex items-start gap-3">
            <img :src="bene.icon" alt="icon" class="w-6 h-6" />
            <span class="text-base font-medium">{{ bene.title }}</span>
          </li>
        </ul>
      </div>

      <!-- Right (form) -->
      <div class="p-8 sm:p-10 w-full">
        <div class="flex justify-center mb-4">
          <img src="../assets/images/user.svg" alt="User" class="w-16 h-16" />
        </div>
        <h1 class="text-center text-2xl font-bold text-[#212529] mb-6">Sign In to Your Account</h1>

        <el-form @submit.prevent="handleLogin" class="space-y-5">
          <el-form-item label="Email" label-position="top">
            <el-input v-model="user.email" placeholder="you@example.com" size="large" />
          </el-form-item>

          <el-form-item label="Password" label-position="top">
            <el-input v-model="user.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
              size="large">
              <template #suffix>
                <el-icon :size="20" class="cursor-pointer text-gray-500 hover:text-[#00BEA1]" @click="togglePassword">
                  <component :is="showPassword ? Hide : View" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="flex justify-end">
            <NuxtLink to="#" class="text-sm text-[#00BEA1] hover:underline">Forgot password?</NuxtLink>
          </div>

          <el-button type="primary" class="w-full !bg-[#00BEA1] hover:!bg-opacity-90" size="large" :loading="isLoading"
            native-type="submit">
            Sign In
          </el-button>

          <p class="text-sm text-center text-gray-500">
            Don’t have an account?
            <NuxtLink to="/signup" class="text-[#00BEA1] font-semibold hover:underline">Sign up</NuxtLink>
          </p>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ['guest-only'],
})
import Shield from "../assets/images/shield.svg"
import Thunder from "../assets/images/Thunder.svg"
import Percentage from "../assets/images/percentage.svg"
import Dollar from "../assets/images/dollar.svg"
import Like from "../assets/images/like.svg"
import { Loading, View, Hide } from "@element-plus/icons-vue"
import { Login } from "@/composables/auth";
import { ElNotification } from 'element-plus'


const benefits = [
  { title: 'Secure payments through reliable partners', icon: Shield },
  { title: 'Fast services', icon: Thunder },
  { title: 'Fair Commissions', icon: Percentage },
  { title: 'Best Available Rates', icon: Dollar },
  { title: 'Convenience', icon: Like }
]

const user = ref({
  email: '',
  password: ''
})
const isLoading = ref(false)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  isLoading.value = true
  let auth = {}
  await Login(user.value).then(response => {
    auth = response.data
    localStorage.setItem('auth', JSON.stringify(auth))
    if (auth.user.role === 'admin') navigateTo('/admin');
    else if (auth.user.role === 'staff') navigateTo('/staff');
    else if (auth.user.role === 'customer') navigateTo('/customer');
  }).catch(error => {
    ElNotification({
      title: 'Error',
      message: error.response.data.error,
      type: 'error',
      position: 'bottom-right'
    })

  }).finally(() => {
    isLoading.value = false
  })
}
</script>
<style>
.el-form-item__label {
  color: #212529;
  font-weight: 600;
  font-size: 14px;
}

.el-button {
 @apply rounded-lg px-6 py-3 text-sm bg-economy text-white transition-all duration-300 hover:opacity-60 gap-x-1 border-none;

}
</style>
