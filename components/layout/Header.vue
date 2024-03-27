<template>
    <header class="flex justify-between items-center fixed top-0 w-full py-6 px-10 bg-[#000]">
        <div class="flex flex-grow basis-0 text-white">
            <div>Menu</div>
        </div>
        <div>
            <NuxtLink to="/">
                <img src="../../logo.svg" alt="" class="">
            </NuxtLink>
        </div>
        <div class="flex flex-grow justify-end basis-0">
            <button class="text-white border border-white rounded-full px-4 py-2 font-semibold
            hover:bg-white hover:text-black transition-colors backdrop:blur-3xl">
                <div class="flex flex-row gap-1">
                    <div>Login</div>
                    <div>/</div>
                    <div>Register</div>
                </div>
            </button>
        </div>
    </header>
</template>