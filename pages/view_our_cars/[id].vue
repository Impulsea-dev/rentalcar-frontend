<template>
    <div>
        <section class="flex flex-col py-24 md:py-32 px-5 md:px-10 lg:px-20">
            <HeroAnimation>
                <div class="flex flex-col items-center gap-10 mb-14">
                    <span class="text-2xl md:text-5xl">Our Impressive Collection of Cars</span>
                </div>
            </HeroAnimation>

            <div class="flex gap-4 mb-10 flex-wrap justify-center md:justify-start">
                <div class="flex max-w-xs w-full">
                    <SelectGeneric :items="collections" @SelectedItem="handleSelectedCollection" />
                </div>
                <div class="flex max-w-xs w-full">
                    <SelectGeneric :items="collections" @SelectedItem="handleSelectedCollection" />
                </div>
                <div class="flex max-w-xs w-full">
                    <SelectGeneric :items="collections" @SelectedItem="handleSelectedCollection" />
                </div>
            </div>

            <transition name="fade" mode="out-in">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :key="currentPage">
                    <CarItem v-for="car in currentPageCars" :car="car" :key="car.name" />
                </div>
            </transition>
            <div class="flex justify-between items-center py-20">
                <vue-awesome-paginate :total-items="totalCars" :items-per-page="itemsPerPage" :max-pages-shown="5"
                    v-model="currentPage" @click="goToPage" :hide-prev-next="true" />
                <span class="text-base">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
            </div>
        </section>

    </div>
</template>
<script setup>
const route = useRoute()
const cars = ref([
  {
    name: 'Hyundai Grand i 10 Sedan',
    price: 90,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg',
    type: ['Compact'],
    category: 'standard',
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '30 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    name: 'Hyundai i 20',
    price: 45,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/i20.jpg',
    type: ['Compact'],
    category: 'standard',
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Manual',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'None',
      mileage: '32 MPG',
      appleCarplay: false,
      androidAuto: false
    }
  },
  {
    name: 'Hyundai Grand i 10',
    price: 80,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/prestige-motors-hyundai-i10-main-1.jpg',
    type: ['Intermediate'],
    category: 'standard',
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: false,
      radio: true,
      camera: 'None',
      mileage: '33 MPG',
      appleCarplay: false,
      androidAuto: false
    }
  },
  {
    name: 'Hyundai Grand i 10 Sedan',
    price: 90,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/Economy-Rental-Car-Grand-I-10.jpg',
    type: ['Intermediate'],
    category: 'standard',
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 2
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '30 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    name: 'Hyundai Accent',
    price: 100,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/economy-discount-car-rental-2018-hyundai-accent-ext3.jpg',
    type: ['Full-Size'],
    category: 'standard',
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 3
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: 'Back-up',
      mileage: '34 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  },
  {
    name: 'SsangYoung Tivoli',
    price: 110,
    image: 'https://economycarrental.com.ky/wp-content/uploads/2017/01/ssangyong-tivoli.jpg',
    type: ['Full-Size'],
    category: 'commercial', // Este es el que usa naranja
    specs: {
      doors: 4,
      seats: 5,
      transmission: 'Automatic',
      airConditioning: true,
      luggage: 3
    },
    features: {
      bluetooth: true,
      radio: true,
      camera: '360',
      mileage: '28 MPG',
      appleCarplay: true,
      androidAuto: true
    }
  }
])

const currentPage = ref(parseInt(route.params.id || 1));
const itemsPerPage = ref(4);

const totalCars = computed(() => cars.value.length);
const totalPages = computed(() => Math.ceil(totalCars.value / itemsPerPage.value));

const currentPageCars = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = Math.min(startIndex + itemsPerPage.value, cars.value.length);
    return cars.value.slice(startIndex, endIndex);
});

const goToPage = (page) => {
    currentPage.value = page;
    navigateTo(`/view_our_cars/${page}`);
};

const collections = ref([
    { id: 0, name: 'All' },
])

const handleSelectedCollection = (newSelected) => {
    console.log(newSelected);
};
</script>
<style>
.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: black;
    border: 1px solid black;
    color: white;
}

.active-page:hover {
    background-color: #010101;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>