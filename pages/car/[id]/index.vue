<template>
    <div class="grid grid-cols-2 justify-items-center my-20">
        <div class="flex flex-col gap-y-10">
            <span class="text-3xl font-bold">{{ route.params.id }}</span>
            <img src="~/assets/images/carpage.svg" class="hover:scale-110 transition-transform duration-300" alt="">
            <div class="bg-[#000] p-4 rounded-xl">
                <div class="flex justify-between text-white">
                    <span class="text-xl">day</span>
                    <span class="text-xl">$300</span>
                </div>
                <div class="flex justify-between text-white">
                    <span class="text-xl">month</span>
                    <span class="text-xl">$1300</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-y-6">
            <span class="text-3xl font-bold">Specifications</span>
            <div class="flex gap-x-1 items-center">
                <IconUser class="text-2xl text-[#000]" />
                <span class="text-xl">4 Doors, 4 Seats</span>
            </div>
            <div class="flex gap-x-2 items-center">
                <IconGasstation class="text-2xl text-[#000]" />
                <span class="text-xl">Premium Unleaded (Over 91 Octane)</span>
            </div>
            <div class="flex gap-x-2 items-center">
                <IconAutomatic class="text-2xl text-[#000]" />
                <span class="text-xl">Automatic</span>
            </div>
            <div class="flex gap-x-2 items-center">
                <IconCar class="text-2xl text-[#000]" />
                <span class="text-xl">SUV</span>
            </div>
            <ul class="text-base">
                <li>Gas V12 , 6.0L</li>
                <li>4-Wheel Drive</li>
                <li>7-Speed Shiftable Autotransmission</li>
                <li>4 wheel Anti-lock Braking System (ABS)</li>
                <li>Dual front side mounted airbags</li>
                <li>Front and rear head airbags</li>
                <li>Traction Control</li>
                <li>Stability Control</li>
            </ul>
            <NuxtLink to="reservation" class="mt-4 flex justify-center items-center gap-x-2 rounded-full w-40 px-6 py-3 text-base italic bg-[#000] text-white transition-all
                 duration-300 hover:bg-black/90">
                Reserve
                <iconRight />
            </NuxtLink>
        </div>

    </div>
</template>
<script setup>
const route = useRoute()
</script>