<template>
    <el-dialog v-model="visible" title="Reservation Details" width="800px" :before-close="onClose">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <p class="font-semibold">Customer Name:</p>
                <p>{{ reservation.customer_info?.name || fullNameFromProfile }}</p>
            </div>
            <div>
                <p class="font-semibold">Email:</p>
                <p>{{ reservation.customer?.email || '-' }}</p>
            </div>

            <div>
                <p class="font-semibold">Pickup Date:</p>
                <p>{{ formatDate(reservation.pickup_date) }}</p>
            </div>
            <div>
                <p class="font-semibold">Return Date:</p>
                <p>{{ formatDate(reservation.return_date) }}</p>
            </div>

            <div>
                <p class="font-semibold">Pickup Location:</p>
                <p>Airport Plaza, George Town</p>
            </div>
            <div>
                <p class="font-semibold">Return Location:</p>
                <p>Airport Plaza, George Town</p>
            </div>

            <div>
                <p class="font-semibold">Vehicle:</p>
                <p>{{ reservation.vehicle?.brand_name }} {{ reservation.vehicle?.model }} - {{ reservation.vehicle?.year
                    }}</p>
            </div>
            <div>
                <p class="font-semibold">Plate:</p>
                <p>{{ reservation.vehicle?.plate || '-' }}</p>
            </div>
            <div>   
                <p class="font-semibold">Total Days:</p>
                <p>{{ getTotalDays(reservation.pickup_date, reservation.return_date) }}</p>
            </div>

            <div>
                <p class="font-semibold">Payment Type:</p>
                <p>{{ reservation.payment_info?.type || '-' }}</p>
            </div>
            <div>
                <p class="font-semibold">Total Price:</p>
                <p>${{ getTotalPrice(reservation) }}</p>
            </div>
        </div>

        <template #footer>
            <el-button @click="onClose">Close</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { getTotalDays } from '@/utils/index'

const props = defineProps({
    modelValue: Boolean,
    reservation: Object
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatLocation = (loc) => {
    return loc?.name || `${loc?.street || ''}, ${loc?.city || ''}`
}

const fullNameFromProfile = computed(() => {
    const p = props.reservation?.customer?.profile
    return p ? `${p.first_name} ${p.last_name}` : '-'
})

const onClose = () => {
    visible.value = false
}

const getTotalPrice = (reservation) => {
    const rate = reservation.daily_rate?.value || 0
    const days = getTotalDays(reservation.pickup_date, reservation.return_date)
    return (rate * days).toFixed(2)
}
</script>
