<template>
    <div class="flex flex-row justify-center items-end gap-4 bg-white/80 py-6 px-4 rounded-lg mx-4 md:mx-10 flex-wrap">
        <div class="flex flex-col gap-1 items-start">
            <div> Pick-up location</div>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IconLocation class="size-4" />
                </div>
                <input type="search" id="searchp" class="block w-72 p-3 ps-10 text-sm border rounded-lg 
                    bg-white placeholder-black/80 text-black focus:outline-none" placeholder="Search a Location">
            </div>
        </div>
        <div class="flex flex-col gap-1 items-start">
            <div> Pick-up date</div>
            <div class="relative">
                <input type="date" id="date1" class="block w-72 p-3 text-sm border rounded-lg 
                    bg-white placeholder-black/70 text-black focus:outline-none" placeholder="Search a Location">
            </div>
        </div>
        <div class="flex flex-col gap-1 items-start">
            <div> Drop-off location</div>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IconLocation class="size-4" />
                </div>
                <input type="search" id="searchd" class="block w-72 p-3 ps-10 text-sm border rounded-lg 
                    bg-white placeholder-black/80 text-black focus:outline-none" placeholder="Search a Location">
            </div>
        </div>
        <div class="flex flex-col gap-1 items-start">
            <div>Drop-off date</div>
            <div class="relative">
                <input type="date" id="date2" class="block w-72 p-3 text-sm border rounded-lg 
                    bg-white placeholder-black/70 text-black focus:outline-none" placeholder="Search a Location">
            </div>
        </div>
        <a href=""
            class="flex items-center gap-x-2 rounded-full px-6 py-3 text-base italic bg-black text-white transition-all duration-300">
            Find a Vehicule
            <iconRight />
        </a>
    </div>
</template>