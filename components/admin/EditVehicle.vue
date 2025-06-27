<template>
    <div>
        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="p-4 flex flex-col flex-grow overflow-hidden">
                    <el-tabs v-model="activeTab" class="flex-grow overflow-auto">
                        <el-tab-pane label="General" name="general">
                            <VehicleGeneralForm v-model="localVehicle" />
                        </el-tab-pane>
                        <el-tab-pane label="Features" name="features">
                            <VehicleFeaturesForm v-model="localVehicle" />
                        </el-tab-pane>
                        <el-tab-pane label="Pricing" name="pricing">
                            <VehiclePricingForm v-model="localVehicle" />
                        </el-tab-pane>
                    </el-tabs>

                    <div class="flex justify-end pt-4">
                        <button @click="saveChanges"
                            class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all duration-300 hover:opacity-60 gap-x-1">
                            <el-icon v-if="isUpdating" class="animate-spin" size="16">
                                <Loading />
                            </el-icon>
                            <el-icon v-else size="16">
                                <Edit />
                            </el-icon>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </Transition>


        <Transition name="overlay-fade">
            <div v-if="showModal" class="overlay bg-[#111112] bg-opacity-50 fixed inset-0 z-[999]" @click="closeModal">
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import VehicleGeneralForm from '@/components/admin/vehicles/GeneralForm.vue'
import VehicleFeaturesForm from '@/components/admin/vehicles/FeaturesForm.vue'
import VehiclePricingForm from '@/components/admin/vehicles/PricingForm.vue'
import { Loading, Edit } from '@element-plus/icons-vue'

const props = defineProps({
    vehicle: Object,
    visible: Boolean
})

const showModal = ref(false)
const emit = defineEmits(['close'])
const localVehicle = reactive({})
const isUpdating = ref(false)

watch(() => props.visible, (val) => {
    if (val && props.vehicle) {
        openModal()
        Object.assign(localVehicle, props.vehicle)
    }
})

const openModal = () => {
    document.body.style.overflow = 'hidden';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
    emit('close')
};
const activeTab = ref('general')


const saveChanges = () => {
    isUpdating.value = true
    console.log('Saving vehicle', localVehicle)
    closeModal()
}
</script>
<style scoped>
@keyframes modal-fade-slide {
    0% {
        opacity: 0;
        transform: translate(-50%, 20px);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes overlay-fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.modal-fade-enter-active {
    animation: modal-fade-slide 0.24s ease-out forwards;
}

.modal-fade-leave-active {
    animation: modal-fade-slide 0.24s ease-in reverse forwards;
}

.overlay-fade-enter-active {
    animation: overlay-fade 0.3s ease-out forwards;
}

.overlay-fade-leave-active {
    animation: overlay-fade 0.3s ease-in reverse forwards;
}
</style>
