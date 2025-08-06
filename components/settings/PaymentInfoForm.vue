<template>
  <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
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
      <el-input :model-value="formattedCardNumber" @input="onCardNumberInput" maxlength="19"
        placeholder="1234 5678 9012 3456" size="large" style="width: 100%;" />
    </el-form-item>
    <el-form-item label="Last 4 digits" prop="last_four" size="large">
      <el-input v-model="payment.last_four" maxlength="4" />
    </el-form-item>
    <el-form-item label="CVV" prop="cvv">
      <el-input v-model="payment.cvv" maxlength="4" placeholder="123" size="large" style="width: 100%;" show-password
        @input="onCvvInput" />
    </el-form-item>

    <el-form-item label="Expiry Date">
      <el-input v-model="expiryInput" placeholder="MM/YY" size="large" />
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="payment.is_default" label="Use as default card" />
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({ payment: Object })
const expiryInput = ref('')

onMounted(() => {
  const month = props.payment.expiry_month || ''
  const year = props.payment.expiry_year || ''

  if (month && year) {
    const paddedMonth = String(month).padStart(2, '0')
    const shortYear = String(year).slice(-2) // Solo los últimos dos dígitos
    expiryInput.value = `${paddedMonth}/${shortYear}`
  }
})

const formattedCardNumber = computed(() => {
  return props.payment.card_number.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
})

const onCardNumberInput = (value) => {
  props.payment.card_number = value.replace(/\s/g, '')
}

const onCvvInput = (value) => {
  props.payment.cvv = value.replace(/\D/g, '')
}


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

</script>
