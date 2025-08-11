<template>
  <el-form label-position="top" class="grid md:grid-cols-3 gap-4">
    <el-form-item label="Saved Payments">
      <el-select v-model="selectedPaymentId" placeholder="Select a payment method" size="large"
        @change="onSelectPayment">
        <el-option v-for="(p, index) in payments" :key="index" :label="`${p.cardholder_name} •••• ${p.last_four}`"
          :value="index" />
        <el-option label="Add new payment method" value="new" />
      </el-select>
    </el-form-item>
    <el-form-item label="Type" prop="type">
      <el-select v-model="payment.type" placeholder="Select payment method" size="large">
        <el-option label="Credit Card" value="credit_card" />
      </el-select>
    </el-form-item>
    <el-form-item label="Card Provider" prop="provider">
      <el-select v-model="payment.provider" placeholder="Visa, MasterCard..." size="large">
        <el-option label="Visa" value="visa" />
        <el-option label="MasterCard" value="mastercard" />
        <el-option label="Amex" value="amex" />
      </el-select>
    </el-form-item>
    <el-form-item label="Cardholder Name" prop="cardholder_name" size="large">
      <el-input v-model="payment.cardholder_name" />
    </el-form-item>
    <el-form-item label="Card Number" prop="card_number">
      <el-input v-model="formattedCardNumber" maxlength="19" placeholder="1234 5678 9012 3456" size="large"
        style="width: 100%;" />
    </el-form-item>
    <el-form-item label="Last 4 digits" prop="last_four" size="large">
      <el-input v-model="payment.last_four" maxlength="4" readonly />
    </el-form-item>
    <el-form-item label="CVV" prop="cvv">
      <el-input v-model="payment.cvv" maxlength="4" placeholder="123" size="large" style="width: 100%;" show-password
        @input="onCvvInput" />
    </el-form-item>

    <el-form-item label="Expiry Date">
      <el-input v-model="expiryInput" placeholder="MM/YY" size="large" />
    </el-form-item>

    <el-form-item class="md:col-span-2 flex justify-center">
      <el-switch v-model="payment.is_default" active-text="Use as default card" inactive-text="" />
    </el-form-item>

  </el-form>
</template>

<script setup>
const props = defineProps({ payment: Object, payments: Array })
const expiryInput = ref('')
const selectedPaymentId = ref(null)
const emit = defineEmits(['change:isNewPayment'])

onMounted(() => {
  const month = props.payment.expiry_month || ''
  const year = props.payment.expiry_year || ''

  if (month && year) {
    const paddedMonth = String(month).padStart(2, '0')
    const shortYear = String(year).slice(-2) // Solo los últimos dos dígitos
    expiryInput.value = `${paddedMonth}/${shortYear}`
  }

  if (props.payments.length > 0) {
    const defaultIndex = props.payments.findIndex(p => p.is_default)
    if (defaultIndex !== -1) {
      selectedPaymentId.value = defaultIndex
      loadPayment(props.payments[defaultIndex])
    } else {
      selectedPaymentId.value = 'new'
    }
  }
})

const loadPayment = (payment) => {
  Object.assign(props.payment, payment)
}

const formattedCardNumber = computed({
  get() {
    const cleaned = props.payment.card_number?.replace(/\s/g, '') || ''
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
  },
  set(value) {
    const raw = value.replace(/\s/g, '')
    props.payment.card_number = raw
    props.payment.last_four = raw.slice(-4)
  }
})

const onCvvInput = (value) => {
  props.payment.cvv = value.replace(/\D/g, '')
}

watch(selectedPaymentId, (val) => {
  if (val === 'new') {
    const emptyPayment = {
      cardholder_name: '',
      last_four: '',
      expiry_month: 12,
      expiry_year: 2025,
      is_default: false,
      provider: '',
      type: 'credit_card',
      card_number: '',
      cvv: ''
    }
    for (const key in props.payment) {
      delete props.payment[key]
    }
    Object.assign(props.payment, emptyPayment)

  } else {
    const found = props.payments[val]
    if (found) {
      loadPayment(found)
    }
  }
})


watch(expiryInput, (val) => {
  const regex = /^(\d{1,2})\/(\d{2,4})$/
  const match = val.match(regex)

  if (match) {
    let month = parseInt(match[1], 10)
    let year = parseInt(match[2], 10)
    if (month >= 1 && month <= 12) {
      if (year < 100) {
        year += 2000
      }

      if (year >= 2024 && year <= 2040) {
        props.payment.expiry_month = month
        props.payment.expiry_year = year
      }
    }
  }
})

const onSelectPayment = (value) => {
  if (value === 'new') {
    emit('change:isNewPayment', true)
  } else {
    emit('change:isNewPayment', false)
  }
}

</script>
