<template>
    <section class="flex flex-col items-center justify-center bg-[#F5F5F5] text-black">
        <div class="flex flex-col items-center gap-10 my-40">
            <span class="text-[48px] italic">Our Impressive Collection of Cars</span>
            <span class="text-lg max-w-3xl text-center">Ranging from elegant sedans to powerful sports cars, all
                carefully selected to provide our customers with the ultimate driving experience.</span>

            <div class="flex flex-row gap-x-6">
                <span class="text-lg italic text-black bg-white rounded-full px-5 py-3 hover:text-white
                    hover:bg-black hover:cursor-pointer transition-all duration-300" v-for="tab in tabs">{{ tab
                    }}</span>
            </div>
            <div class="grid grid-cols-3 gap-6 mt-4">
                <CarItem v-for="car in cars" :car="car" />
            </div>
            <a href="" class="flex items-center gap-x-2 bg-white rounded-full text-black px-10 py-4 text-base italic hover:bg-black 
            hover:text-white transition-all duration-300">
                See All Cars
                <iconRight />
            </a>
        </div>
    </section>
</template>
<script setup>
import card3 from "../assets/images/car3.svg";
import iconRight from "./icon/icon-right.vue";
const tabs = ref(["Popular Car", "Luxary Car", "Vintage Car", "Family Car", "Off-Road Car"])
const cars = ref([{
    name: 'BMW i8',
    price: 90,
    image: card3,
},
{
    name: 'Aston Martin Vantage',
    price: 70,
    image: card3
},
{
    name: 'Maserati Quattroporte MC',
    price: 30,
    image: card3
}, {
    name: `Mercedes-AMG GT`,
    price: 100,
    image: card3
},
{
    name: `Chevrolet Silverado 1500`,
    price: 40,
    image: card3
},
{
    name: `Toyota Land Cruiser Prader`,
    price: 50,
    image: card3
}])
</script>