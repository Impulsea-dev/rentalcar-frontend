<template>
    <div class="px-0 py-24 md:py-32 max-w-4xl mx-auto">
        <el-steps :active="activeStep" finish-status="success" align-center class="custom-steps">
            <el-step v-if="activeStep === 0  || !isAuthenticated" title="User Information" />
            <el-step title="Location & Date" />
            <el-step title="Reservation" />
        </el-steps>
        <div class="mt-8">
            <div v-if="activeStep === 0">
                <ReservationForm1 ref="ReservationForm1Ref" v-model="reservation" />
            </div>
            <div v-else-if="activeStep === 1">
                <LocationDate1 ref="LocationDate1Ref" v-model="reservation" />

            </div>
            <div v-else-if="activeStep === 2">
                <ReservationComplete :reservation="reservation" />
            </div>
        </div>
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
definePageMeta({
    middleware: ['layout-auth-client'],
})
import { ref } from 'vue'
import { ElSteps, ElStep, ElButton } from 'element-plus'
import ReservationForm1 from '@/components/reservation/ReservationForm1.vue'
import LocationDate1 from '@/components/reservation/LocationDate1.vue'
import ReservationComplete from '@/components/reservation/ReservationComplete.vue'
import { createPublicReservation, save } from '@/composables/reservations'
import { Loading, Check } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getVehicleById } from "@/composables/vehicles";
const activeStep = ref(0)
const totalSteps = 3
const formRef = ref()
const locationDateRef = ref()
const ReservationForm1Ref = ref(null)
const LocationDate1Ref = ref(null)
const isSavingReservation = ref(false)
const route = useRoute()
const router = useRouter()
const vehicle = ref({})
const reservation = reactive({
    customer_info: {
        name: '',
        email: '',
        phone: '',
        country: '',
        license_number: '',
    },
    payment_info: {
        type: "credit_card",
        provider: "visa",
        last_four: "",
        expiry_month: 12,
        expiry_year: 2025,
        is_default: true,
        cardholder_name: ''
    },
    pickup_location_id: '',
    return_location_id: '',
    pickup_date: '',
    return_date: ''
})

onMounted(async() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
        activeStep.value = 1
    }
    await getVehicleByIdData()
})

const isAuthenticated = computed(() => !!localStorage.getItem('auth'))

const next = async () => {
    let canContinue = true
    if (activeStep.value === 0) {
        canContinue = await ReservationForm1Ref.value?.validateForm()
    }
    if (activeStep.value === 1) {
        canContinue = await LocationDate1Ref.value?.validateForm()
    }

    if (!canContinue) {
        return
    }

    if (activeStep.value < totalSteps - 1) {
        activeStep.value++
    }

    // let canContinue = true

    // if (activeStep.value === 0) {
    //     canContinue = await formRef.value?.validateForm()
    //     if (canContinue) {
    //         const customer_info = formRef.value?.getFormData()
    //         const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
    //         localStorage.setItem('reservationData', JSON.stringify({ ...existingData, customer_info }))
    //     }
    // }

    // if (activeStep.value === 1) {
    //     canContinue = await locationDateRef.value?.validateForm()
    //     if (canContinue) {
    //         const locationData = locationDateRef.value?.getFormData()
    //         const existingData = JSON.parse(localStorage.getItem('reservationData') || '{}')
    //         localStorage.setItem('reservationData', JSON.stringify({ ...existingData, ...locationData }))
    //     }
    // }

    // if (!canContinue) return

    // if (activeStep.value < totalSteps - 1) {
    //     activeStep.value++
    // }
}



const prev = () => {
    const auth = localStorage.getItem('auth')
    if (auth && activeStep.value === 1) {
        return
    }
    if (activeStep.value > 0) {
        activeStep.value--
    }
}

const completeReservation = async () => {
    isSavingReservation.value = true
    const vehicleId = route.params.id
    reservation.vehicle_id = vehicleId

    let payload
    let token = null

    if (isAuthenticated.value) {
        const auth = JSON.parse(localStorage.getItem('auth'))
        token = auth.token
        payload = {
            vehicle_id: vehicleId,
            customer_id: auth.user.id,
            pickup_date: reservation.pickup_date,
            return_date: reservation.return_date,
            pickup_location_id: reservation.pickup_location_id,
            return_location_id: reservation.return_location_id,
            daily_rate: {
                value: vehicle.value.daily_rate.value
            }
        }
    } else {
        payload = reservation
    }

    const request = isAuthenticated.value
        ? save(payload, token)
        : createPublicReservation(payload)

    try {
        await request
        ElNotification({
            title: 'Success',
            message: 'Reservation created successfully',
            type: 'success',
            position: 'bottom-right'
        })
        setTimeout(() => router.go(0), 2000)
    } catch (error) {
        console.log(error)
        ElNotification({
            title: 'Error',
            message: error?.response?.data?.error || 'An error occurred',
            type: 'error',
            position: 'bottom-right'
        })
    } finally {
        isSavingReservation.value = false
    }
}

const getVehicleByIdData = async () => {
    await getVehicleById(route.params.id).then((response) => {
        vehicle.value = response.data
    }).catch((error) => {
        console.log(error)
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
