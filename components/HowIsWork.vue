<template>
    <section class="flex flex-col items-center justify-center bg-white text-black">
        <div class="flex flex-col items-center gap-10 my-20 md:my-40 mx-4">
            <span class="text-3xl md:text-5xl italic">How it woks</span>
            <span class="text-base md:text-lg max-w-3xl text-center italic">Renting a luxury car has never been easier.
                Our
                streamlined
                process makes it simple for you to book and confirm your vehicle of choice online</span>

            <div class="flex flex-row items-center mt-5 md:mt-10">
                <div class="flex flex-col gap-4 relative z-10">
                    <div class="flex bg-white rounded-xl border gap-4 p-4" v-for="(item, i) in items" :key="i">
                        <div class="bg-[#F5F5F5] rounded-xl p-4 min-h-24 lg:min-h-32 flex justify-center items-center">
                            <component :is="item.icon" class="size-6 lg:size-8" />
                        </div>
                        <div class="flex flex-col gap-y-1">
                            <span class="text-xl lg:text-2xl">{{ item.title }}</span>
                            <span class="text-sm lg:text-lg max-w-md text-pretty">{{ item.subtitle }}</span>
                        </div>
                    </div>
                </div>
                <div class="bg-secondary p-28 rounded-2xl relative z-0 left-[-64px] hidden lg:block">
                    <img src="../assets/images/car4.svg" alt="" class="w-full h-full object-cover
                    hover:scale-110 transition duration-500 cursor-pointer" />
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import iconSearch from './icon/icon-search.vue';
import iconCalendar from './icon/icon-calendar.vue';
import iconFacehappy from './icon/icon-facehappy.vue';
const items = [{
    title: 'Browse and select',
    subtitle: 'Choose from our wide range of premium cars, select the pickup and return dates and locations that suit you best.',
    icon: iconSearch
},
{
    title: 'Book and confirm',
    subtitle: 'Book your desired car with just a few clicks and receive an instant confirmation via email or SMS.',
    icon: iconCalendar
},
{
    title: 'Enjoy your ride',
    subtitle: 'Pick up your car at the designated location and enjoy your premium driving experience with our top-quality service.',
    icon: iconFacehappy
}]
</script>