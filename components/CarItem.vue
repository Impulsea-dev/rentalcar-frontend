<template>
    <article class="flex flex-col gap-y-2 bg-white rounded-xl p-2 hover:scale-105 transition-all duration-300 relative">
        <img :src="car.image" alt="">
        <span class="text-lg md:text-xl text-black tracking-wide italic">{{ car.name }}</span>
        <span class="text-xl md:text-3xl italic max-w-xs text-pretty flex flex-row items-end">{{ car.price }}
            <span class="text-base italic text-gray-500 mb-1">/day</span></span>
        <div class="bg-[#F6F6F6] rounded-lg p-4 flex flex-row justify-center gap-x-4 my-2 px-2 italic">
            <div class="flex flex-col text-black text-sm md:text-base gap-y-1 items-center">
                <img src="../assets/images/watch.svg" class="size-5" alt="" />
                <span>4,000</span>
            </div>
            <div class="flex flex-col text-black text-sm md:text-base gap-y-1 items-center">
                <img src="../assets/images/typecar.svg" class="size-5" alt="" />
                <span>Auto</span>
            </div>
            <div class="flex flex-col text-black text-sm md:text-base gap-y-1 items-center">
                <img src="../assets/images/typecar.svg" class="size-5" alt="" />
                <span>4 Person</span>
            </div>
            <div class="flex flex-col text-black text-sm md:text-base gap-y-1 items-center">
                <img src="../assets/images/typecar.svg" class="size-5" alt="" />
                <span>Electric</span>
            </div>
        </div>
        <div class="flex flex-col flex-grow justify-end mb-5 px-4">
            <NuxtLink :to="`/car/${car.name}/`" class="rounded-full px-4 py-2 bg-white border-[1.5px] border-black mt-4
                    hover:text-white hover:bg-black transition-colors duration-300 text-center text-sm md:text-base
                    hover:cursor-pointer">Rent Now</NuxtLink>
        </div>
    </article>
</template>
<script setup>
const props = defineProps(['car'])
</script>