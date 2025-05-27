<template>
  <section class="bg-gray-50 pt-20">
    <div class="max-w-7xl mx-auto px-6">
      <span class="text-4xl mb-4 flex justify-center">Current Offers & Discounts</span>
      <p class="text-lg mb-10 text-center">Check out our latest deals and save big on your next rental.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="offer in offers"
          :key="offer.id"
          class="group h-full flex flex-col rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-110"
        >
          <img
            v-if="offer.image"
            :src="offer.image"
            :alt="offer.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6 flex flex-col flex-grow items-center text-center">
            <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ offer.title }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ offer.subtitle }}</p>
            <p class="text-gray-700 mb-6 flex-grow">{{ offer.description }}</p>
            <button
              class="inline-flex items-center border-none text-orange-500 font-medium rounded px-4 py-2"
              @click="window.open(offer.url, '_blank')"
            >
              View Offer
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const offers = ref([{
    id: 1,
    title: 'Weekly Rental Discount',
    subtitle: 'Save 20% on rentals of 7 days or more',
    description: 'Book a weekly rental and get 20% off the total price, plus complimentary GPS.',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/ssangyong-tivoli.jpg',
    url: '#'
  },
  {
    id: 2,
    title: 'Summer Sale Special',
    subtitle: 'Up to 25% off for summer bookings',
    description: 'Enjoy our summer sale with up to 25% discount on all vehicles when you book before July 31.',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/discount_economy_car_rental_creta_2018_main1.jpg',
    url: '#'
  },
  {
    id: 3,
    title: 'Airport Pickup Deal',
    subtitle: 'Free airport pickup',
    description: 'Get a free pickup service from the airport terminal when you rent for 3 days or more.',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/economy-discount-car-rental-2018-hyundai-accent-ext3.jpg',
    url: '#'
  },
//   {
//     id: 4,
//     title: 'Long-Term Rental Offer',
//     subtitle: 'Special rates for monthly rentals',
//     description: 'Rent for a month and benefit from our best long-term rates and dedicated support.',
//     image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/ssangyong-tivoli.jpg',
//     url: '#'
//   }
])

</script>

<style scoped>
/* No additional styles needed; Tailwind CSS handles layout and transitions */
</style>
