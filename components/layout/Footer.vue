<template>
    <footer
        class="flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-4 py-10 px-4 md:px-20 bg-background">
        <NuxtLink to="/">
            <!-- <img src="/logorental.svg" alt="" class="w-[171px] h-8"> -->
             <Logo/>
        </NuxtLink>
        <nav class="flex gap-x-6 flex-wrap justify-center">
            <!-- <NuxtLink to="/" class="text-white text-sm hidden md:block">Home</NuxtLink> -->
            <NuxtLink to="/aboutus" class="text-white text-sm">About Us</NuxtLink>
            <NuxtLink to="/" class="text-white text-sm">Rental Cars</NuxtLink>
            <NuxtLink to="/faqs" class="text-white text-sm">FAQ</NuxtLink>
            <NuxtLink to="/our-blog" class="text-white text-sm">Blog</NuxtLink>
            <NuxtLink to="/contact-us" class="text-white text-sm">Contact Us</NuxtLink>
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
