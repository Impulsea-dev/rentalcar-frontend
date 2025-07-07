<template>
  <section class="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
    <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
      <!-- Left (benefits) -->
      <div class="hidden md:flex flex-col justify-center items-start gap-6 p-10 bg-[#00BEA1] text-white">
        <h2 class="text-2xl font-extrabold text-white">Why choose us?</h2>
        <ul class="space-y-4">
          <li v-for="bene in benefits" :key="bene.title" class="flex items-start gap-3">
            <img :src="bene.icon" alt="icon" class="w-6 h-6">
            <span class="text-base font-medium">{{ bene.title }}</span>
          </li>
        </ul>
      </div>

      <!-- Right (form) -->
      <div class="p-8 sm:p-10">
        <div class="flex justify-center mb-4">
          <img src="../assets/images/user.svg" alt="User" class="w-16 h-16">
        </div>
        <h1 class="text-center text-2xl font-bold text-[#212529] mb-6">Sign In to Your Account</h1>
        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block mb-2 text-base font-semibold text-[#212529]">Email</label>
            <input type="email" id="email" v-model="user.email"
              class="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#00BEA1] focus:outline-none"
              placeholder="you@example.com" />
          </div>
          <div>
            <label for="password" class="block mb-2 text-base font-semibold text-[#212529]">Password</label>
            <input type="password" id="password" v-model="user.password"
              class="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#00BEA1] focus:outline-none"
              placeholder="••••••••" autocomplete="on" />
          </div>

          <div class="flex justify-end">
            <NuxtLink to="#" class="text-sm text-[#00BEA1] hover:underline">Forgot password?</NuxtLink>
          </div>

          <button type="submit"
            class="w-full bg-[#00BEA1] text-white font-semibold py-3 rounded-xl hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center gap-1">
            <el-icon v-if="isLoading" class="animate-spin" size="18">
              <Loading />
            </el-icon>
            Sign In
          </button>

          <p class="text-sm text-center text-gray-500">
            Don’t have an account?
            <NuxtLink to="#" class="text-[#00BEA1] font-semibold hover:underline">Sign up</NuxtLink>
          </p>
        </form>
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
import { Loading } from "@element-plus/icons-vue"
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
