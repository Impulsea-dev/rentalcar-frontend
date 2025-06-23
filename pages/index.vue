<template>
    <div>
        <section class="h-screen text-center overflow-hidden bg-background">
            <div class="flex flex-col h-full relative">
                <h2
                    class="text-white pt-32 md:pt-40 text-4xl md:text-[48px] xl:text-[64px] font-bold tracking-in-expand-forward-bottom pb-4">
                    Best Rental Car Service In Grand Cayman
                </h2>
                <p class="text-white text-base md:text-lg lg:text-xl tracking-in-expand-forward-bottom">
                    From as low as $25 per day with limited time offer discounts
                </p>

                <div class="flex flex-col flex-grow justify-end pb-10">
                    <HeroAnimation>
                        <ClientOnly>
                            <div class="md:flex items-center hidden my-10 2xl:mx-20">
                                <img src="@/assets/images/herocar1.webp"
                                    class="cars-img translate-x-10 2xl:translate-x-20" alt="Car 1">
                                <img src="@/assets/images/herocar2.webp"
                                    class="cars-img -translate-x-10 2xl:-translate-x-20" alt="Car 2">

                            </div>
                        </ClientOnly>
                        <Filters class="-translate-y-10" />
                    </HeroAnimation>
                </div>
            </div>
        </section>
        <CurrentOffers />
        <OurServices />
        <Deals&Products />
        <ImpresiveCars />
        <HowIsWork />
        <ContactInfo />
    </div>

</template>
<script setup>
useSeoMeta({
    title: 'Rental Car',
    ogTitle: 'Rental Car',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})
</script>
<style>
.cars-img {
    width: 100%;
    height: 384px;
    object-fit: contain;
    aspect-ratio: 1/1;
}
</style>