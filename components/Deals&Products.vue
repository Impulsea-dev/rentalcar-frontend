<template>
    <section class="flex flex-col items-center justify-center bg-secondary">
        <div class="flex flex-col items-center gap-10 my-20 md:my-40">
            <span class="text-3xl md:text-5xl text-black">Deals and Products</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <article class="bg-white hover:cursor-pointer overflow-hidden transition-all duration-300 rounded-xl"
                    v-for="item in items">
                    <img :src="item.img"
                        class="w-full h-60 object-cover object-center transform transition-all duration-300 group-hover:scale-105 hover:scale-105"
                        alt="" />
                    <div class="p-6 flex flex-col flex-grow space-y-2">
                        <span class="text-lg md:text-xl text-black/80">{{ item.subtitle }}</span>
                        <span class="text-2xl md:text-3xl max-w-sm text-pretty text-black">{{ item.title
                            }}</span>
                        <div class="flex flex-col flex-grow justify-end">
                            <button class="rounded-full px-6 py-3 bg-primary mt-4
      text-sm md:text-base hover:bg-primary-dark-light transition-colors duration-300 font-bold text-white">
                                Book Now
                            </button>
                        </div>
                    </div>
                </article>

            </div>
        </div>
    </section>
</template>
<script setup>
const items = ref([
    {
        title: 'Book now a SUV for $1099',
        subtitle: 'SUV',
        img: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/economy_discount_car_rentals_cayman-Hyundai-Tuscon-GL-2018-2-798x466.jpg'
    },
    {
        title: 'Book now a Van or Truck for $1099',
        subtitle: 'Vans & Trucks',
        img: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/discount_economy-rentals-cayman-Hyundai-H1-Van-2018-798x466.jpg'
    },
    {
        title: 'Get a SsangYong Car for $400',
        subtitle: 'SsangYong ',
        img: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/ssangyong-tivoli.jpg'
    }
])
</script>