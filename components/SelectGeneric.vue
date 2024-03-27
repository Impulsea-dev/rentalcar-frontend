<template>
    <div class="w-full z-10">
        <HeadlessListbox v-model="selectedItem">
            <div class="relative mt-1">
                <HeadlessListboxButton class="relative w-full text-black rounded-lg bg-white py-2 pl-3 pr-10
                         text-left focus:outline-none border">
                    <span class="block truncate">{{ selectedItem.name }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-black" aria-hidden="true" />
                    </span>
                </HeadlessListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <HeadlessListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
                        <HeadlessListboxOption v-for="item in props.items" v-slot="{ active, selected }"
                            :key="item.name" :value="item" as="template">
                            <li :class="[
            active ? 'bg-gray-300 text-black' : 'text-black',
            'relative cursor-default select-none py-2 pl-10 pr-4',
        ]">
                                <span :class="[
            selected ? 'font-medium' : 'font-normal',
            'block truncate',
        ]">{{ item.name }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </HeadlessListboxOption>
                    </HeadlessListboxOptions>
                </transition>
            </div>
        </HeadlessListbox>
    </div>
</template>
<script setup>
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'
const { emit } = getCurrentInstance();
const props = defineProps(["items"]);
const selectedItem = ref(props.items[0])

watch(selectedItem, (newSelected) => {
    emit('SelectedItem', newSelected)
})
</script>