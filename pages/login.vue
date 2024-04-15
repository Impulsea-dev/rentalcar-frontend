<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-40 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-[#212529] rounded-2xl shadow md:mt-0 sm:max-w-4xl xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="place-content-center hidden md:block">
                            <ul class="max-w-md space-y-1 text-white list-inside">
                                <li class="flex flex-row items-start gap-x-2 text-base font-bold pb-4 last:pb-0"
                                    v-for="bene in benefits">
                                    <img :src="bene.icon" alt="">
                                    {{ bene.title }}
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div class="flex justify-center">
                                <img src="../assets/images/user.svg" alt="">
                            </div>
                            <h1
                                class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                                Sign In
                            </h1>
                            <form class="space-y-4" action="#">
                                <div>
                                    <label for="email" class="block mb-2 text-xl font-bold text-white">Email</label>
                                    <input type="email" name="email" id="email" v-model="user.email"
                                        class="bg-white text-gray-900 sm:text-sm rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="">
                                </div>
                                <div>
                                    <label for="password"
                                        class="block mb-2 text-xl font-bold text-white">Password</label>
                                    <input type="password" name="password" id="password" v-model="user.password"
                                        autocomplete="on"
                                        class="bg-white text-gray-900 sm:text-sm rounded-2xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                </div>
                                <div class="flex items-center justify-end">
                                    <NuxtLink to=""
                                        class="text-sm font-medium text-gray-400 underline hover:cursor-pointer">
                                        Forgot
                                        password?</NuxtLink>
                                </div>
                                <button type="submit"
                                    class="w-full text-white bg-[#FD9800] hover:bg-opacity-90 transition-all duration-300 focus:ring-2 focus:ring-white focus:outline-none font-bold rounded-2xl text-base px-5 py-2.5 text-center">Sign
                                    in</button>
                                <p class="text-sm font-medium text-gray-400 flex justify-center gap-x-1">
                                    Don’t have an account? <NuxtLink to=""
                                        class="font-medium text-white underline hover:cursor-pointer">Sign
                                        up</NuxtLink>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import Shield from "../assets/images/shield.svg"
import Thunder from "../assets/images/Thunder.svg"
import Percentage from "../assets/images/percentage.svg"
import Dollar from "../assets/images/dollar.svg"
import Like from "../assets/images/like.svg"
const benefits = [
    {
        title: 'Secure payments through reliable partners',
        icon: Shield
    },
    {
        title: 'Fast services',
        icon: Thunder
    },
    {
        title: 'Fair Commisions',
        icon: Percentage
    },
    {
        title: 'Best Available Rates',
        icon: Dollar
    },
    {
        title: 'Convenience',
        icon: Like
    }
]

const user = ref({
    email: null,
    password: null
})
</script>