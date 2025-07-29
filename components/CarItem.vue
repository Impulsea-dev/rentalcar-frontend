<template>
    <article class="flex flex-col gap-y-2 bg-white rounded-xl relative overflow-hidden border">
        <!-- <span
    :class="[
      'absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full text-white z-10',
      car.category === 'commercial' ? 'bg-primary' : 'bg-economy'
    ]"
  >
    <svg
      v-if="car.category === 'commercial'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
    
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9 17v-6h10v6m-10 0a2 2 0 1 1-4 0m4 0H7m10 0h-2m2 0a2 2 0 1 0 4 0m-4 0H17
           M3 10h18M5 6h14v4H5V6z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
  
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 13l1-2h16l1 2M5 10V6h14v4M5 10h14m-2 7a2 2 0 1 1-4 0m6 0a2 2
           0 1 1-4 0"
      />
    </svg>
    <span>{{ car.category === 'commercial' ? 'Discount' : 'Economy' }}</span>
  </span> -->
        <img :src="car.thumbnail ? car.thumbnail : 'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg'"
            class="hover:scale-125 transition-transform duration-500 hover:-translate-y-8 w-auto h-60" alt="">
        <div class="flex flex-col flex-grow space-y-4 p-4">
            <span class="text-lg md:text-xl text-black font-medium tracking-wide">{{ car.model }} {{ car.year }} {{
                car.color }}</span>
            <p class="self-stretch flex-grow-0 flex-shrink-0 w-[336px] text-left font-semibold my-1">
                <span class="self-stretch flex-grow-0 flex-shrink-0 text-[32px] text-left text-black">{{
                    car.daily_rate.text }}</span><span
                    class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-black/70">/day</span>
            </p>
            <div class="bg-[#F6F6F6] rounded-lg p-4 flex flex-row justify-center gap-x-4 my-2 px-2">
                <div class="flex flex-col text-black text-sm gap-y-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5" color="currentColor">
                            <path d="M9.007 17a2 2 0 1 1-4 0a2 2 0 0 1 4 0m10 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                            <path
                                d="M2.007 10h16m-16 0c0 .78-.02 3.04.004 5.26c.036.72.156 1.32 2.998 1.74m-3.002-7c.216-1.74 1.155-3.8 1.635-4.58M9.007 10V5m5.99 12H9.002M2.022 5H12.24s.54 0 1.02.048c.899.084 1.654.492 2.41 1.512c.8 1.08 1.414 2.448 2.23 3.18c1.355 1.216 3.933.84 4.077 3.42c.036 1.32.036 2.76-.024 3c-.097.707-.642.822-1.32.84c-.588.016-1.297-.028-1.642 0" />
                        </g>
                    </svg>
                    <span>{{ car.doors }} doors</span>
                </div>
                <div class="flex flex-col text-black text-sm gap-y-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fill-rule="evenodd">
                            <path
                                d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path fill="currentColor"
                                d="M3.468 16.745c.494-.958 1.539-1.6 2.804-1.441c1.214.152 2.588.38 3.97.726c2.247.562 4.181 1.7 5.513 2.654l.4.295l.184.14l.336.266l.291.24l.347.302c.844.751.27 1.978-.684 2.068l-.112.005H7.922a5 5 0 0 1-3.741-1.683l-.163-.194l-.2-.249c-.773-.967-.838-2.183-.35-3.129m2.556.543c-.4-.05-.653.131-.779.374a.85.85 0 0 0 .054.848l.081.115l.2.25a3 3 0 0 0 2.148 1.119l.194.006h6.221c-1.15-.773-2.677-1.603-4.386-2.03a32 32 0 0 0-3.733-.681ZM19 2c.62 0 1.074.338 1.36.704c.273.347.45.78.573 1.196c.25.843.367 1.927.412 3.009c.037.911.024 1.876-.023 2.776l-.042.66c-.07.968-.18 1.815-.304 2.372c-.533 2.398-1.465 3.847-2.508 4.637c-.999.756-2.157.92-2.915.54c-.331-.165-.652-.462-.918-.77a5.7 5.7 0 0 1-.801-1.237c-.466-.975-.753-2.293-.283-3.703c.291-.873.852-1.417 1.346-1.824l.318-.256c.563-.448 1.031-.832 1.39-1.551c.093-.186.161-.56.177-1.195l.003-.303l-.008-.746c-.005-.3-.01-.617-.007-.924c.007-.65.048-1.42.3-2.047c.134-.333.348-.681.697-.945A2 2 0 0 1 19 2m-.097 2.15c-.083.252-.127.66-.133 1.255v.282l.009.689c.005.335.01.688.002 1.03c-.016.642-.076 1.42-.387 2.041c-.435.872-.993 1.437-1.49 1.86l-.29.24l-.153.121c-.595.474-.869.717-1.012 1.148c-.264.79-.12 1.563.19 2.208c.153.323.34.595.513.796c.08.094.149.161.199.206l.075.064l.095-.004c.133-.011.394-.064.74-.326c.547-.415 1.296-1.375 1.763-3.477c.042-.191.084-.436.123-.721l.056-.457q.015-.12.026-.248l.047-.53l.039-.568l.016-.295l.023-.606a27 27 0 0 0-.007-1.867c-.043-1.027-.152-1.917-.332-2.523a3 3 0 0 0-.112-.319Z" />
                        </g>
                    </svg>
                    <span>{{ car.seats }} seats</span>
                </div>
                <div class="flex flex-col text-black text-sm gap-y-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M2 4a2 2 0 1 1 2.75 1.855v5.395h6.5V5.855a2 2 0 1 1 1.5 0v5.395H16c.964 0 1.612-.002 2.095-.066c.461-.063.659-.17.789-.3s.237-.328.3-.79c.064-.482.066-1.13.066-2.094V5.855a2 2 0 1 1 1.5 0v2.197c0 .898 0 1.648-.08 2.242c-.084.628-.27 1.195-.726 1.65c-.455.456-1.022.642-1.65.726c-.594.08-1.343.08-2.242.08H12.75v5.395a2 2 0 1 1-1.5 0V12.75h-6.5v5.395a2 2 0 1 1-1.5 0V5.855A2 2 0 0 1 2 4" />
                        <path fill="currentColor" fill-rule="evenodd"
                            d="M17.25 15a.75.75 0 0 1 .75-.75h2.286c1.375 0 2.464 1.134 2.464 2.5a2.5 2.5 0 0 1-1.641 2.358l1.53 2.5a.75.75 0 1 1-1.279.784l-1.923-3.142h-.687V22a.75.75 0 0 1-1.5 0zm1.5 2.75h1.536c.518 0 .964-.433.964-1s-.446-1-.964-1H18.75z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>{{ car.transmission }}</span>
                </div>
                <div class="flex flex-col text-black text-sm gap-y-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M7 21q-.825 0-1.412-.587T5 19V8q0-.825.588-1.412T7 6h2V4q0-.825.588-1.412T11 2h2q.825 0 1.413.588T15 4v2h2q.825 0 1.413.588T19 8v11q0 .825-.587 1.413T17 21q0 .425-.288.713T16 22t-.712-.288T15 21H9q0 .425-.288.713T8 22t-.712-.288T7 21m0-2h10V8H7zm3-10q-.425 0-.712.288T9 10v7q0 .425.288.713T10 18t.713-.288T11 17v-7q0-.425-.288-.712T10 9m4 0q-.425 0-.712.288T13 10v7q0 .425.288.713T14 18t.713-.288T15 17v-7q0-.425-.288-.712T14 9m-3-3h2V4h-2zm1 7.5" />
                    </svg>
                    <span>{{ car.luggage_capacity }} luggages</span>
                </div>
                <!-- <div class="flex flex-col text-black text-sm gap-y-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2">
                        <path
                            d="M8 16a3 3 0 0 1-3 3m11-3a3 3 0 0 0 3 3m-7-3v4M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <path d="M7 13v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
                    </g>
                </svg>
                <span>{{ car.specs.airConditioning ? 'Yes' : 'No' }}</span>
            </div> -->
            </div>
            <div class="flex flex-col flex-grow justify-end mb-5 px-4">
                <!-- <NuxtLink :to="`/car/${car.name}/`" class="rounded-full px-4 py-2 bg-white border-[1.5px] border-black mt-4
                    hover:text-white hover:bg-black transition-colors duration-300 text-center text-sm md:text-base
                    hover:cursor-pointer">Rent Now</NuxtLink> -->
                <ButtonGeneric :to="`/car/${car.id}/`"
                    class="px-4 py-2 text-sm md:text-base font-medium before:bg-economy">
                    Rent Now
                </ButtonGeneric>
            </div>

        </div>
    </article>
</template>
<script setup>
const props = defineProps(['car'])
</script>