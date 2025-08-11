<template>
    <div>
        <button @click="openModal"
            class="bg-economy text-white rounded px-4 py-2 border border-economy hover:bg-economy/80 transition-all duration-300 font-normal flex justify-center items-center gap-1">
            <el-icon size="14">
                <Plus />
            </el-icon>
            New
            Vehicle</button>

        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="absolute top-4 right-4 hover:cursor-pointer z-[1001]" @click="closeModal">
                    <el-icon size="20" color="gray">
                        <CloseBold />
                    </el-icon>
                </div>
                <div class="p-4 flex flex-col flex-grow overflow-y-auto">
                    <el-tabs v-model="activeTab" class="flex-grow overflow-auto">
                        <el-tab-pane label="General Info" name="general">
                            <GeneralForm v-model="vehicle" />
                        </el-tab-pane>
                        <el-tab-pane label="Features" name="features">
                            <FeaturesForm v-model="vehicle" />
                        </el-tab-pane>
                        <el-tab-pane label="Pricing" name="pricing">
                            <PricingForm v-model="vehicle" />
                        </el-tab-pane>
                    </el-tabs>
                    <div class="flex justify-end pt-4">
                        <button @click="saveVehicle"
                            class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all duration-300 hover:opacity-60 gap-x-1">
                            <el-icon v-if="isSaving" class="animate-spin" size="16">
                                <Loading />
                            </el-icon>
                            <el-icon v-else size="16">
                                <Plus />
                            </el-icon>
                            Save
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
import { Plus, CloseBold, Loading } from '@element-plus/icons-vue'
import GeneralForm from './GeneralForm.vue';
import FeaturesForm from './FeaturesForm.vue';
import PricingForm from './PricingForm.vue';
import { createVehicle, addImagesToVehicle, addThumbnailToVehicle } from '@/composables/vehicles'
const showModal = ref(false)
const isSaving = ref(false)
const activeTab = ref('general')
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
    images: [],
    plate: ''
})

const userLogged = JSON.parse(localStorage.getItem('auth'))

const openModal = () => {
    document.body.style.overflow = 'hidden';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
};



const saveVehicle = async () => {
    isSaving.value = true
    const imagesToSend = {
        images: vehicle.images
            ? vehicle.images.filter(img => img.image.startsWith('data:image'))
            : null
    }
    const thumbnailToSend = vehicle.thumbnail
    const vehicleToSend = { ...vehicle }
    delete vehicleToSend.images
    delete vehicleToSend.thumbnail

    try {
        const response = await createVehicle(vehicleToSend, userLogged.token)
        console.log(response)
        const vehicleId = response?.id

        if (!vehicleId) throw new Error('Vehicle ID not returned')

        if (imagesToSend.images?.length) {
            await addImagesToVehicle(vehicleId, imagesToSend, userLogged.token)
        }

        if (thumbnailToSend) {
            await addThumbnailToVehicle(vehicleId, thumbnailToSend, userLogged.token)
        }

        ElNotification({
            title: 'Success',
            message: 'Vehicle created successfully',
            type: 'success',
            position: 'bottom-right'
        })
    } catch (error) {
        console.error(error)
        ElNotification({
            title: 'Error',
            message: error?.response?.data?.error || 'Something went wrong',
            type: 'error',
            position: 'bottom-right'
        })
    } finally {
        isSaving.value = false
    }
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