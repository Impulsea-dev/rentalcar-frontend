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
                <button v-if="activeStep < totalSteps - 1" @click="next" class=" mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base bg-black text-white transition-all
                 duration-300 hover:opacity-60">
                    Next
                    <iconRight />
                </button>

                <button v-else @click="completeReservation" class="mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base bg-black text-white transition-all
                 duration-300 hover:opacity-60">
                    Complete Reservation
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
const activeStep = ref(0)
const totalSteps = 3
const formRef = ref()
const locationDateRef = ref()

const next = async () => {
    let canContinue = true

    if (activeStep.value === 0) {
        canContinue = await formRef.value?.validateForm()
        if (canContinue) {
            const userData = formRef.value?.getFormData()
            const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
            localStorage.setItem('reservationData', JSON.stringify({ ...existingData, user: userData }))
        }
    }

    if (activeStep.value === 1) {
        canContinue = await locationDateRef.value?.validateForm()
        if (canContinue) {
            const locationData = locationDateRef.value?.getFormData()
            const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
            localStorage.setItem('reservationData', JSON.stringify({ ...existingData, location: locationData }))
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

const completeReservation = () => {
    localStorage.removeItem('reservationData')
    console.log('Reserva completada 🎉')
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
