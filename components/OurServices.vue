<template>
    <div>
        <section class="flex flex-col items-center justify-center bg-white text-black">
            <div class="flex flex-col items-center gap-10 my-20 md:my-40 px-4">
                <span class="text-3xl md:text-5xl">Our Services & Benefits</span>
                <span class="text-base md:text-lg max-w-3xl text-center">To make renting easy and hassle-free, we
                    provide a
                    variety
                    of
                    services and advantages. We have you
                    covered with a variety of vehicles and flexible rental terms.</span>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <article class="flex flex-col gap-y-2 items-center" v-for="item in items">
                        <img :src="item.img" alt="">
                        <span class="text-xl font-semibold">{{ item.title }}</span>
                        <span class="text-lg max-w-md text-pretty text-center">{{ item.subtitle }}</span>
                    </article>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import quality from "../assets/images/quality.svg";
import affordable from "../assets/images/affordable.svg";
import convenient from "../assets/images/convenient.svg";
const items = ref([{
    title: 'Quality Choice',
    subtitle: 'We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.',
    img: quality
},
{
    title: 'Affordable Prices',
    subtitle: 'Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.',
    img: affordable
},
{
    title: 'Convenient Online Booking',
    subtitle: 'With our easy-to-use online booking system, customers can quickly and conveniently reserve their rental car from anywhere, anytime.',
    img: convenient
}])
</script>