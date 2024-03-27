<template>
    <transition appear name="hero">
        <div v-show="animation">
            <slot />
        </div>
    </transition>
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