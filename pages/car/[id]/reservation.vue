<template>
    <div class="px-0 py-24 md:py-32 max-w-4xl mx-auto">
        <!-- Pasos -->
        <el-steps :active="activeStep" finish-status="success" align-center class="custom-steps">
            <el-step title="User Information" />
            <el-step title="Location & Date" />
            <el-step title="Reservation" />
        </el-steps>

        <!-- Contenido dinámico -->
        <div class="mt-8">
            <div v-if="activeStep === 0">
                <ReservationForm ref="formRef" />
            </div>
            <div v-else-if="activeStep === 1">
                <LocationDate ref="locationDateRef" />

            </div>
            <div v-else-if="activeStep === 2">
                <ReservationComplete />
            </div>
        </div>

        <!-- Botones -->
        <div class="mt-8 flex justify-between">
            <button v-if="activeStep > 0" @click="prev" class=" mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base italic bg-white text-black border border-black/50 transition-all
                 duration-300">
                <IconArrowLeft />
                Go Back
            </button>

            <div class="ml-auto">
                <button v-if="activeStep < totalSteps - 1 && activeStep !== 2" @click="next" class=" mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base bg-economy text-white transition-all
                 duration-300 hover:opacity-60">
                    Next
                    <iconRight />
                </button>

                <button v-else @click="completeReservation" class="mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base bg-economy text-white transition-all
                 duration-300 hover:opacity-60">
                    <el-icon v-if="isSavingReservation" class="animate-spin" size="16">
                        <Loading />
                    </el-icon>
                    <el-icon v-else size="16">
                        <Check />
                    </el-icon>
                    Complete
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElSteps, ElStep, ElButton } from 'element-plus'
import ReservationForm from '@/components/reservation/ReservationForm.vue'
import LocationDate from '@/components/reservation/LocationDate.vue'
import ReservationComplete from '@/components/reservation/ReservationComplete.vue'
import { createPublicReservation } from '@/composables/reservations'
import { Loading, Check } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const activeStep = ref(0)
const totalSteps = 3
const formRef = ref()
const locationDateRef = ref()
const isSavingReservation = ref(false)
const route = useRoute()
const router = useRouter()

const next = async () => {
    let canContinue = true

    if (activeStep.value === 0) {
        canContinue = await formRef.value?.validateForm()
        if (canContinue) {
            const customer_info = formRef.value?.getFormData()
            const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
            localStorage.setItem('reservationData', JSON.stringify({ ...existingData, customer_info }))
        }
    }

    if (activeStep.value === 1) {
        canContinue = await locationDateRef.value?.validateForm()
        if (canContinue) {
            const locationData = locationDateRef.value?.getFormData()
            const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
            localStorage.setItem('reservationData', JSON.stringify({ ...existingData, ...locationData }))
        }
    }

    if (!canContinue) return

    if (activeStep.value < totalSteps - 1) {
        activeStep.value++
    }
}



const prev = () => {
    if (activeStep.value > 0) {
        activeStep.value--
    }
}

const completeReservation = async () => {
    let reservation = JSON.parse(localStorage.getItem('reservationData'))
    reservation.vehicle_id = route.params.id
    isSavingReservation.value = true
    await createPublicReservation(reservation).then((response) => {
        ElNotification({
            title: 'Success',
            message: 'Reservation created successfully',
            type: 'success',
            position: 'bottom-right'
        })
        setTimeout(() => {
            router.go(0)
        }, 2000)
    }).catch((error) => {
        console.log(error)
        ElNotification({
            title: 'Error',
            message: error.response.data.error,
            type: 'error',
            position: 'bottom-right'
        })
    }).finally(() => {
        isSavingReservation.value = false
    })


}
</script>
<style scoped>
::v-deep(.el-step__line) {
    top: 24px !important;
    /* ajusta este valor para centrar la línea */
    height: 2px !important;
    /* grosor de la línea */
    /* color por defecto */
}


/* Aumenta tamaño del icono */
::v-deep(.custom-steps .el-step__icon) {
    width: 48px;
    height: 48px;
    font-size: 20px;
}

/* Aumenta tamaño del título */
::v-deep(.custom-steps .el-step__title) {
    font-size: 18px;
}
</style>
