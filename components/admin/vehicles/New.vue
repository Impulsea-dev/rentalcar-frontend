<template>
    <div>
        <button @click="openModal"
            class="bg-economy text-white rounded px-4 py-2 border border-economy hover:bg-economy/80 transition-all duration-300 font-medium">New
            Vehicle</button>

        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="py-10 flex flex-col flex-grow overflow-y-auto">
                    <el-steps :active="activeStep" finish-status="success" align-center class="custom-steps">
                        <el-step title="General" />
                        <el-step title="Features" />
                        <el-step title="Pricing" />
                    </el-steps>
                    <div class="mt-8 flex-grow px-4">
                        <div v-if="activeStep === 0">
                            <GeneralForm v-model="vehicle" />
                        </div>
                        <div v-else-if="activeStep === 1">
                            <FeaturesForm v-model="vehicle" />
                        </div>
                        <div v-else-if="activeStep === 2">
                            <PricingForm v-model="vehicle" />
                        </div>

                        <!-- <div v-else-if="activeStep === 1">
                            <LocationDate ref="locationDateRef" />

                        </div>
                        <div v-else-if="activeStep === 2">
                            <ReservationComplete />
                        </div> -->
                    </div>

                    <div class="mt-auto flex justify-between px-4">
                        <button v-if="activeStep > 0" @click="prev" class="flex justify-center items-center gap-x-2 rounded-md px-4 py-2 text-sm bg-white text-black border border-black/50 transition-all
                 duration-300">
                            Go Back
                        </button>

                        <div class="ml-auto">
                            <button v-if="activeStep < totalSteps - 1" @click="next" class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all
                 duration-300 hover:opacity-60">
                                Next
                            </button>

                            <button v-else @click="saveVehicle" class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all
                 duration-300 hover:opacity-60">
                                Save Vehicle
                            </button>
                        </div>
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
import GeneralForm from './GeneralForm.vue';
import FeaturesForm from './FeaturesForm.vue';
import PricingForm from './PricingForm.vue';
import { version } from 'vue';
const showModal = ref(false)
const activeStep = ref(0)
const totalSteps = 3
const vehicle = reactive({
    class: '',
    brand_name: '',
    model: '',
    color: '',
    vin: '',
    capacity: 4,
    year: new Date().getFullYear(),
    daily_rate: { value: 0 },
    weekly_rate: { value: 0 },
    monthly_rate: { value: 0 },
    deposit_amount: { value: 0 },
    insurance_amount: { value: 0 },
    gps: false,
    bluetooth: false,
    air_conditioning: false,
    sunroof: false,
    parking_sensors: false,
    backup_camera: false,
    child_seat: false,
    usb_ports: 0,
    seats: 4,
    doors: 4,
    luggage_capacity: 0,
    fuel_type: '',
    transmission: '',
    images:[]
})


const openModal = () => {
    document.body.style.overflow = 'hidden';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
};

const next = async () => {
     if (activeStep.value < totalSteps - 1) {
        activeStep.value++
    }
}

const prev = () => {
    if (activeStep.value > 0) {
        activeStep.value--
    }
}

const saveVehicle = async () => {
    console.log('Saving vehicle', vehicle)
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