<template>
    <section class="flex flex-col items-center justify-center bg-[#F5F5F5] text-black">
        <div class="flex flex-col items-center gap-10 my-20 md:my-40">
            <span class="text-3xl md:text-5xl italic">Deals and Products</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <article class="flex flex-col gap-y-4 bg-white rounded-xl p-4 hover:cursor-pointer"
                    v-for="item in items">
                    <img :src="item.img" class="mt-2" alt="">
                    <span class="text-lg md:text-xl text-black/80 italic">{{ item.subtitle }}</span>
                    <span class="text-2xl md:text-3xl italic max-w-xs text-pretty">{{ item.title }}</span>
                    <div class="flex flex-col flex-grow justify-end">
                        <button class="rounded-full px-6 py-3 bg-white border-[1.5px] border-black mt-4
                        text-sm md:text-base hover:text-white hover:bg-black transition-colors duration-300">Book
                            Now</button>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
<script setup>
import car1 from "../assets/images/car1.svg";
import rental from "../assets/images/rental.svg";
import car2 from "../assets/images/car2.svg";

const items = ref([
    {
        title: 'Book now and save up to 30%',
        subtitle: 'Rent the Car',
        img: car1
    },
    {
        title: 'Sign up as Business Customer',
        subtitle: 'Business Car Rental',
        img: rental
    },
    {
        title: 'Or drive away in another car',
        subtitle: 'Get a Tesla from $1099 per month',
        img: car2
    }
])
</script>