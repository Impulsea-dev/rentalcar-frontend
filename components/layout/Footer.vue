<template>
    <footer class="flex justify-between items-center py-10 px-20 bg-[#000]">
        <NuxtLink to="/">
            <img src="../../logo.svg" alt="" class="">
        </NuxtLink>
        <nav class="flex gap-6">
            <NuxtLink to="/" class="text-white text-sm">Home</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">About Us</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">Rental Cars</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">FAQ</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">Blog</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">Contact Us</NuxtLink>
        </nav>
        <nav class="flex justify-center items-center gap-2">
            <iconInstagram class="text-white" />
            <IconFacebook class="text-white" />
            <iconTwitter class="text-white" />
            <IconYoutube class="text-white" />
        </nav>
    </footer>
    <!-- <div class="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right p-6 pt-0 mt-auto">
        © {{ new Date().getFullYear() }}. Economy Rental All rights reserved.
    </div> -->
</template>
