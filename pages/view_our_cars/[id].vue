<template>
    <div>
        <section class="flex flex-col py-24 md:py-32 px-5 md:px-10 lg:px-20">
            <HeroAnimation>
                <div class="flex flex-col items-center gap-10 mb-14">
                    <span class="text-2xl md:text-5xl italic">Our Impressive Collection of Cars</span>
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
import card3 from "~/assets/images/car3.svg";
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
},
{
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