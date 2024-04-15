<template>
    <section class="flex flex-col items-center justify-center bg-white text-black">
        <div class="flex flex-col items-center gap-10 my-20 md:my-40 mx-4">
            <span class="text-3xl md:text-5xl italic">Contact Info</span>
            <span class="text-base md:text-lg max-w-3xl text-center italic">We guarantee the newest, cleanest and most
                reliable
                rental cars available anywhere on the island.</span>

            <div class="flex flex-row items-center mt-10">
                <div class="rounded-2xl relative z-0 left-[80px] opacity-90 hidden lg:block">
                    <img src="../assets/images/city.svg" alt="" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-col gap-4 relative z-10">
                    <div class="flex bg-white rounded-xl border gap-4 p-4 min-h-32" v-for="(item, i) in items" :key="i">
                        <div class="bg-[#F5F5F5] rounded-xl p-4 flex justify-center items-center">
                            <component :is="item.icon" class="size-6 lg:size-8" />
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <span class="text-xl lg:text-2xl italic">{{ item.title }}</span>
                            <span class="text-base md:text-lg max-w-md text-pretty">{{ item.subtitle }}</span>
                            <span class="text-base md:text-lg max-w-md text-pretty" v-if="item.subtitle1">{{
                        item.subtitle1 }}</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
</template>
<script setup>
import iconPhone from "./icon/icon-phone.vue"
import iconLocation from './icon/icon-location.vue';
import iconClock from "./icon/icon-clock.vue"
const items = [{
    title: 'Phone Numbers',
    subtitle: '1-345-943-9550',
    subtitle1: '1-345-949-9550',
    icon: iconPhone
},
{
    title: 'Address',
    subtitle: 'P.O. Box 10315Grand Cayman KY1-1003',
    icon: iconLocation
},
{
    title: 'Opening of Service',
    subtitle: 'Monday - Friday 8:00 a.m - 5:00 p.m',
    icon: iconClock
}]
</script>