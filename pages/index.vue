<template>
    <div>
        <section class="h-screen text-center overflow-hidden bg-background">
            <HeroAnimation>

            <div class="flex flex-col h-full relative">
                <!-- <HeroAnimation class="px-5"> -->
                <h2
                    class="text-white pt-32 md:pt-40 text-[48px] md:text-[64px] font-bold tracking-in-expand-forward-bottom pb-4">
                    Best Rental Car Service In Grand Cayman
                </h2>
                <p class="text-white text-lg md:text-xl tracking-in-expand-forward-bottom">
                    From as low as $25 per day with limited time offer discounts
                </p>
                <!-- </HeroAnimation> -->

                <div class="flex flex-col flex-grow justify-end pb-10">
                    <ClientOnly>
                        <img src="~/assets/images/car.svg" class="object-contain object-center w-full h-full hidden md:block" alt="">
                    </ClientOnly>
                    <Filters class="-translate-y-10" />
                </div>
            </div>
            </HeroAnimation>
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
        <CurrentOffers/>
        <OurServices />
        <Deals&Products />
        <ImpresiveCars />
        <HowIsWork />
        <ContactInfo />
    </div>

</template>
<script setup>
const animation = ref(false)
useSeoMeta({
  title: 'Rental Car',
  ogTitle: 'Rental Car',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
onMounted(() => {
    animation.value = true
})
</script>