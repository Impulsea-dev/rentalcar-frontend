<template>
    <div>
        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="p-4 flex flex-col flex-grow overflow-hidden">
                    <div class="absolute top-4 right-4 hover:cursor-pointer z-[1001]" @click="closeModal">
                        <el-icon size="20" color="gray">
                            <CloseBold />
                        </el-icon>
                    </div>
                    <el-tabs v-model="activeTab" class="flex-grow overflow-auto"
                        v-if="visible && Object.keys(reservation).length > 0">
                        <el-tab-pane label="Reservation Info" name="reservation">
                            <ReservationFormEdit v-model="localReservation" />
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
import ReservationFormEdit from './ReservationFormEdit.vue';
import { CloseBold, Loading, Edit } from '@element-plus/icons-vue'
import { getReservationById } from "@/composables/reservations";
// import LocationForm from './LocationForm.vue';
const props = defineProps({
    reservation: Object,
    visible: Boolean
})
const showModal = ref(false)
const emit = defineEmits(['close'])
const localReservation = reactive({})
const isUpdating = ref(false)
const activeTab = ref('reservation')
const user = JSON.parse(localStorage.getItem('auth'))

watch(() => props.visible, (val) => {
    if (val && props.reservation) {
        getReservationByIdData()
        openModal()
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

const getReservationByIdData = async () => {
    await getReservationById(props.reservation.id, user.token).then((response) => {
        Object.assign(localReservation, response)
    }).catch((error) => {
        console.log(error)
    })
}

const saveChanges = () => {
    isUpdating.value = true
    // await updateLocationById(localLocation.id, localLocation, user.token).then((response) => {
    //     ElNotification({
    //         title: 'Success',
    //         message: 'Location updated successfully',
    //         type: 'success',
    //         position: 'bottom-right'
    //     })
    //     closeModal()
    // }).catch((error) => {
    //     console.log(error)
    //     ElNotification({
    //         title: 'Error',
    //         message: error.response.data.error,
    //         type: 'error',
    //         position: 'bottom-right'
    //     })
    // }).finally(() => {
    //     isUpdating.value = false
    // })
}
</script>