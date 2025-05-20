<template>
    <header class="flex justify-between items-center fixed top-0 w-full py-4 px-5 md:px-10 bg-[#333E48] z-30">
        <div class="flex flex-grow basis-0 text-white">
            <NuxtLink to="/">
                <img src="/logo.svg" class="w-[171px] h-10" alt="">
            </NuxtLink>
        </div>

        <div class="flex flex-grow justify-end basis-0">
            <NuxtLink to="/login" class="text-white border border-white rounded-full px-4 py-2 font-semibold
            hover:bg-white hover:text-black transition-colors backdrop:blur-3xl duration-300">
                <div class="flex flex-row gap-1">
                    <div>Login</div>
                    <div>/</div>
                    <div>Register</div>
                </div>
            </NuxtLink>
            <!-- <Sidebar /> -->
        </div>
    </header>
</template>
<script setup>
import Sidebar from './Sidebar.vue';
</script>