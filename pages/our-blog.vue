<template>
  <div class="max-w-7xl mx-auto px-6 pt-32">
    <h1 class="text-4xl font-bold text-gray-800 mb-2">Our Blog</h1>
    <p class="text-lg text-gray-600 mb-8">We blog often, so have a read on some awesome tips!</p>

    <el-row :gutter="24">
      <el-col
        v-for="blog in blogs"
        :key="blog.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <article class="group h-full flex flex-col rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <img
            v-if="blog.image"
            :src="blog.image"
            alt="Blog featured image"
            class="w-full h-56 object-cover"
          />
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-sm text-gray-500 mb-2 text-left">{{ blog.date }}</p>
            <h3 class="text-xl font-semibold mb-4 text-gray-800 text-left">{{ blog.title }}</h3>
            <p class="text-gray-700 mb-6 flex-grow text-left">{{ blog.excerpt }}</p>
            <button
              class="mt-auto inline-flex items-center border-none text-orange-500 font-medium px-4 py-2 outline-none"
              @click="window.open(blog.url, '_blank')"
            >
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { ElRow, ElCol, ElCard, ElButton } from 'element-plus'

const blogs = ref([
  {
    id: 1,
    title: 'What To Do if Your Rental Car Has Met With An Accident',
    date: 'May 24, 2018',
    excerpt: 'Getting in an accident, whether in your own car or a rental, is never pleasant. And it will...',
    url: '/blog/what-to-do-if-your-rental-car-has-met-with-an-accident',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/hyundai_fenderbenderv2.jpg'
  },
  {
    id: 2,
    title: 'Car Rental Mistakes That Can Cost You Big',
    date: 'May 9, 2018',
    excerpt: 'As Travellers hit the road this summer, many will drive rental cars in other parts...',
    url: '/blog/car-rental-mistakes-that-can-cost-you-big',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/pexels-photo-2-960x636.jpg'
  },
  {
    id: 3,
    title: 'Should You Buy Extra Car Rental Collision Insurance?',
    date: 'March 2, 2018',
    excerpt: 'Not sure whether to buy insurance at the car rental counter? Here’s how to figure...',
    url: '/blog/should-you-buy-extra-car-rental-collision-insurance',
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/hyundai_blog3.jpg'
  }
])
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
