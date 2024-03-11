<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300">
            <div class="h-full bg-white dark:bg-[#0e1726]">
                <div class="flex items-center justify-between px-4 py-3">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">Economy
                            Rental</span>
                    </NuxtLink>
                    <a href="javascript:;"
                        class="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 hover:text-primary rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                        @click="store.toggleSidebar()">
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>

            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useAppStore } from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';
const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');

onMounted(() => {
    setTimeout(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');

        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];

                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    });
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
