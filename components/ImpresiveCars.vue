<template>
    <div>
        <section class="flex flex-col items-center justify-center bg-[#F5F5F5] text-black">
            <div class="flex flex-col items-center gap-10 my-20 md:my-40 px-4">
                <span class="text-3xl md:text-5xl text-center">Our Impressive Collection of Cars</span>
                <span class="text-lg max-w-3xl text-center">Ranging from elegant sedans to powerful sports cars, all
                    carefully selected to provide our customers with the ultimate driving experience.</span>
                <div class="overflow-auto h-16 w-[22rem] sm:w-[36rem] md:w-auto">
                    <div class="flex flex-row gap-x-3 md:gap-x-6">
                        <span class="text-base md:text-lg text-black bg-white font-normal rounded-full px-5 py-3
                     hover:text-white hover:bg-primary hover:cursor-pointer transition-all duration-300
                     whitespace-nowrap" v-for="tab in tabs">{{ tab }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <CarItem v-for="car in cars" :car="car" />
                </div>
                <!-- <NuxtLink to="/view_our_cars/1" class="flex items-center gap-x-2 bg-white rounded-full text-black px-10 py-4 text-sm md:text-base italic hover:bg-black 
            hover:text-white transition-all duration-300">
                    See All Cars
                    <iconRight />
                </NuxtLink> -->
                <ButtonGeneric :to="'/view_our_cars/1'"
                    :class="'px-10 py-4 text-sm md:text-base bg-white !border-none font-normal'">
                    <div class="flex items-center gap-x-2">
                        See All Cars
                        <iconRight />
                    </div>
                </ButtonGeneric>
            </div>
        </section>
    </div>
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