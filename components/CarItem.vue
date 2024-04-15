<template>
    <article class="flex flex-col gap-y-2 bg-white rounded-xl p-2 relative overflow-hidden">
        <img :src="car.image" class="hover:scale-125 transition-transform duration-500 hover:-translate-y-8" alt="">
        <span class="text-lg md:text-xl text-black tracking-wide italic">{{ car.name }}</span>
        <p class="self-stretch flex-grow-0 flex-shrink-0 w-[336px] italic text-left">
            <span class="self-stretch flex-grow-0 flex-shrink-0 text-[32px] italic text-left text-black">{{
            car.price }}</span><span
                class="self-stretch flex-grow-0 flex-shrink-0 text-base italic text-left text-black/50">/day</span>
        </p>
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
            <!-- <NuxtLink :to="`/car/${car.name}/`" class="rounded-full px-4 py-2 bg-white border-[1.5px] border-black mt-4
                    hover:text-white hover:bg-black transition-colors duration-300 text-center text-sm md:text-base
                    hover:cursor-pointer">Rent Now</NuxtLink> -->
            <ButtonGeneric :to="`/car/${car.name}/`" :class="'px-4 py-2 text-sm md:text-base'">
                Rent Now
            </ButtonGeneric>
        </div>
    </article>
</template>
<script setup>
const props = defineProps(['car'])
</script>