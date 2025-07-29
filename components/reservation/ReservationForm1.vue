<template>
    <div>
        <span class="text-lg font-normal flex justify-center items-center">
            Please fill out this Information in order to serve the desired car
        </span>
        <el-form ref="formRef" :model="modelValue" :rules="rules" label-position="top"
            class="grid md:grid-cols-2 gap-4 py-6 px-32">
            <el-form-item label="Name" prop="customer_info.name">
                <el-input v-model="modelValue.customer_info.name" placeholder="Enter your name" size="large" />
            </el-form-item>

            <el-form-item label="Email" prop="customer_info.email">
                <el-input v-model="modelValue.customer_info.email" type="email" placeholder="Enter your email" size="large" />
            </el-form-item>
            <el-form-item label="Phone">
                <template #label>
                    <label class="text-sm text-gray-700 font-medium">
                        <span class="text-red-500 mr-1">*</span>Phone
                    </label>
                </template>
                <div class="w-full">
                    <MazPhoneNumberInput v-model="modelValue.customer_info.phone" v-model:country-code="phoneCountryCode"
                        :default-country-code="phoneCountryCode || detectedPhoneCountry" show-code-on-list
                        :no-use-browser-locale="false"
                        :preferred-countries="['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'ES', 'IT']" :translations="{
                            countrySelector: {
                                placeholder: 'Country code',
                                error: 'Choose country',
                                searchPlaceholder: 'Search countries...'
                            },
                            phoneNumber: {
                                placeholder: 'Phone number',
                                error: 'Invalid phone number'
                            }
                        }" @update="onPhoneUpdate" class="w-full max-w-full !min-w-0" />
                </div>
            </el-form-item>
            <el-form-item label="Country" prop="customer_info.country">
                <el-select v-model="modelValue.customer_info.country" placeholder="Select your country" size="large" filterable>
                    <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
                </el-select>
            </el-form-item>
            <el-form-item label="License Number" prop="customer_info.license_number">
                <el-input v-model="modelValue.customer_info.license_number" placeholder="Enter your license number" size="large" />
            </el-form-item>
            <el-form-item label="Payment Type" prop="payment_info.type">
                <el-select v-model="modelValue.payment_info.type" placeholder="Select payment method" size="large">
                    <el-option label="Credit Card" value="credit_card" />
                    <el-option label="PayPal" value="paypal" />
                    <el-option label="Cash" value="cash" />
                </el-select>
            </el-form-item>
            <el-form-item label="Card Provider" prop="payment_info.provider">
                <el-select v-model="modelValue.payment_info.provider" placeholder="Visa, MasterCard..." size="large">
                    <el-option label="Visa" value="visa" />
                    <el-option label="MasterCard" value="mastercard" />
                    <el-option label="Amex" value="amex" />
                </el-select>
            </el-form-item>

            <el-form-item label="Cardholder Name" prop="payment_info.cardholder_name">
                <el-input v-model="modelValue.payment_info.cardholder_name" placeholder="John Doe" size="large" />
            </el-form-item>

            <el-form-item label="Last 4 Digits" prop="payment_info.last_four">
                <el-input v-model="modelValue.payment_info.last_four" maxlength="4" placeholder="1234" size="large" />
            </el-form-item>

            <el-form-item label="Expiry Month">
                <el-input-number v-model="modelValue.payment_info.expiry_month" :min="1" :max="12" size="large" style="width: 100%;" />
            </el-form-item>

            <el-form-item label="Expiry Year">
                <el-input-number v-model="modelValue.payment_info.expiry_year" :min="2024" :max="2040" size="large" style="width: 100%;" />
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { getAllCountries, getCurrentCountry } from '~/utils/'
const props = defineProps({
    modelValue: Object
})

const countries = ref([])
const formRef = ref(null)
const phoneCountryCode = ref()
const detectedPhoneCountry = ref('')
const phoneDetectionMethod = ref('')
const rules = {
    'customer_info.name': [{ required: true, message: 'Name is required', trigger: 'blur' }],
    'customer_info.email': [    
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Must be a valid email', trigger: 'blur' }
    ],
    'customer_info.country': [{ required: true, message: 'Country is required', trigger: 'change' }],
    'customer_info.phone': [{ required: true, message: 'Phone number is required', trigger: 'change' }],
    'payment_info.type': [{ required: true, message: 'Payment type is required', trigger: 'change' }],
    'payment_info.provider': [{ required: true, message: 'Card provider is required', trigger: 'change' }],
    'payment_info.cardholder_name': [
        { required: true, message: 'Cardholder name is required', trigger: 'blur' }
    ],
    'payment_info.last_four': [
        { required: true, message: 'Last 4 digits required', trigger: 'blur' },
        { pattern: /^[0-9]{4}$/, message: 'Must be exactly 4 digits', trigger: 'blur' }
    ]
}


onMounted(async () => {
    allCountries()
    getCountry()
})

const allCountries = () => {
    getAllCountries()
        .then(response => {
            countries.value = response
        })
        .catch(error => {
            console.error(error)
        })
}

const getCountry = () => {
    getCurrentCountry()
        .then(response => {
            props.modelValue.customer_info.country = response.country_name
        })
        .catch(error => {
            console.log('Failed to get country for address:', error)
        })
}

const onPhoneUpdate = (results) => {
    console.log('Current country code:', phoneCountryCode.value)
    if (phoneCountryCode.value) {
        detectedPhoneCountry.value = phoneCountryCode.value
        phoneDetectionMethod.value = 'user-input'
    }

    // Optional: Show toast for validation feedback
    if (results && results.isValid) {
        console.log('Valid phone number detected')
        // Could show success toast here
    } else if (props.modelValue.phone && props.modelValue.phone.length > 3) {
        console.log('Invalid phone number format')
        // Could show error toast here
    }
}

const validateForm = () => {
    return formRef.value?.validate();
}

defineExpose({
    validateForm,
})


</script>