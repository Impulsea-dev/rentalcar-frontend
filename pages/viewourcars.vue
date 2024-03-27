<template>
    <div>
        <section class="flex flex-col my-20 px-5 md:px-10 lg:px-20">
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10"
                    :key="currentPage">
                    <CarItem v-for="car in currentPageCars()" :car="car" />
                </div>
            </transition>
            <div class="flex justify-center">
                <vue-awesome-paginate :total-items="cars.length" :items-per-page="itemsPerPage" :max-pages-shown="5"
                    v-model="currentPage" />
            </div>
        </section>

    </div>
</template>
<script setup>
import card3 from "../assets/images/car3.svg";
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

const collections = ref([
    { id: 0, name: 'All' },
])

const handleSelectedCollection = (newSelected) => {
    console.log(newSelected);
};

const currentPage = ref(1);
const itemsPerPage = ref(6);
const currentPageCars = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = Math.min(startIndex + itemsPerPage.value, cars.value.length);
    return cars.value.slice(startIndex, endIndex);
};
watch(currentPage, () => {
    currentPage.value += 1;
    currentPage.value -= 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
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
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
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