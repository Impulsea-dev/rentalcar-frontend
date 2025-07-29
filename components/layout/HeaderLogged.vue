<template>
    <header class="flex justify-between items-center fixed top-0 w-full py-4 px-5 md:px-10 bg-background z-30">
        <div class="flex flex-grow basis-0 text-white">
            <NuxtLink to="/">
                <Logo />
            </NuxtLink>
        </div>

        <div class="flex flex-grow justify-end basis-0 items-center gap-4 text-white">
            <el-dropdown trigger="click">
                <div
                    class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#444f5a] cursor-pointer transition-all">
                 <el-avatar :size="32" src="https://www.gravatar.com/avatar/?d=mp" />
                    <div class="flex items-center gap-1 text-white">
                        <span class="text-sm font-semibold">{{ name }}</span>
                        <el-icon class="text-gray-300">
                            <arrow-down />
                        </el-icon>
                    </div>
                </div>

                <template #dropdown>
                    <el-dropdown-menu class="min-w-[180px] bg-[#2c3640] border-none text-white shadow-xl">
                        <el-dropdown-item disabled class="opacity-100 cursor-default text-white">
                            <div class="flex flex-col text-xs leading-tight">
                                <span class="font-medium">{{ name }}</span>
                                <span class="text-gray-400">Logged in</span>
                            </div>
                        </el-dropdown-item>
                            <el-dropdown-item divided @click="goToDash"  class="text-white hover:bg-[#3b4753]">
                            <el-icon><Menu/></el-icon>
                            <span class="ml-2">Dashboard</span>
                        </el-dropdown-item>

                        <el-dropdown-item divided @click="logout" class="text-white hover:bg-[#3b4753]">
                            <el-icon><switch-button /></el-icon>
                            <span class="ml-2">Logout</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown, SwitchButton, Menu } from '@element-plus/icons-vue'
const router = useRouter()
const user = JSON.parse(localStorage.getItem('auth'))
const name = user.user.profile.first_name + ' ' + user.user.profile.last_name
const logout = () => {
    localStorage.removeItem('auth')
    router.push('/login')
}  

const goToDash = () => {
    router.push(`/${user.user.role}`)
}
</script>