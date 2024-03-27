<template>
    <div>
        <section class="h-screen text-center overflow-hidden bg-[#000]">
            <div class="flex flex-col h-full relative">
                <HeroAnimation>
                    <h2 class="text-white pt-40 text-[64px] font-medium tracking-in-expand-forward-bottom pb-4">
                        Best Rental Car Service In Grand Cayman
                    </h2>
                    <p class="text-white text-xl tracking-in-expand-forward-bottom">
                        From as low as $25 per day with limited time offer discounts
                    </p>
                </HeroAnimation>

                <div class="flex flex-col flex-grow justify-end pb-10">
                    <Filters />
                </div>
            </div>

        </section>
        <!-- <section class="h-screen text-center relative overflow-hidden">
            <div class="flex flex-col h-full relative">
                <HeroAnimation>
                    <h2 class="text-white pt-40 text-[64px] font-medium tracking-in-expand-forward-bottom pb-4">
                        Best Rental Car Service In Grand Cayman
                    </h2>
                    <p class="text-white text-xl tracking-in-expand-forward-bottom">
                        From as low as $25 per day with limited time offer discounts
                    </p>
                </HeroAnimation>

                <div class="flex flex-col flex-grow justify-end pb-10">
                    <Filters />
                </div>
            </div>
            <div class="absolute top-0 bottom-0 h-full w-full">
                <img class="object-center object-cover h-full w-full" src="../assets/images/car.svg" />
            </div>
        </section> -->
        <OurServices />
        <Deals&Products />
        <ImpresiveCars />
        <HowIsWork />
        <ContactInfo />
    </div>

</template>
<script setup>
const animation = ref(false)
onMounted(() => {
    animation.value = true
})
</script>
<style>
.hero-enter-active,
.hero-leave-active {
    transition: transform .75s cubic-bezier(.4, .25, .3, 1), opacity .3s cubic-bezier(.4, .25, .3, 1);
}

.hero-enter-from,
.hero-leave-to {
    opacity: 0;
    transform: translate3d(0, 2rem, 0);
}

.hero-enter-to,
.hero-leave-from {
    opacity: 1;
    transform: translateZ(0);
}
</style>