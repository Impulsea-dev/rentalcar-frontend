<template>
    <div class="flex flex-col items-center my-10">
        <span class="text-lg font-normal text-center max-w-xl">
            Please fill out this Information in order to serve the desired car
        </span>

        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top"
            class="flex flex-col gap-4 my-8 w-96">
            <el-form-item label="Name" prop="name">
                <el-input v-model="formData.name" placeholder="Enter your name" size="large" />
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="formData.email" type="email" placeholder="Enter your email"
                    size="large" />
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
                <!-- Enhanced phone input with better auto-detection -->
                <MazPhoneNumberInput v-model="formData.phone" v-model:country-code="phoneCountryCode"
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
                    }" @update="onPhoneUpdate" class="w-full" />
                <!-- Debug info for phone detection -->
                <div v-if="showPhoneDebug" class="text-xs text-gray-500 mt-1">
                    <span>Detected: {{ detectedPhoneCountry || 'Auto-detecting...' }}</span>
                    <span v-if="phoneDetectionMethod"> via {{ phoneDetectionMethod }}</span>
                </div>
            </el-form-item>

            <el-form-item label="Country" prop="country">
                <el-select v-model="formData.country" placeholder="Select your country" size="large">
                    <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
                </el-select>
            </el-form-item>
            <el-form-item label="License Number" prop="license_number">
                <el-input v-model="formData.license_number" placeholder="Enter your license number"
                    size="large" />
            </el-form-item>

            <!-- <el-form-item label="Street Address" prop="saddress">
                <el-input v-model="formData.saddress" placeholder="Enter your street address" size="large" />
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from 'vue'
import { getAllCountries, getCurrentCountry } from '~/utils/'

const formRef = ref(null)
const instance = getCurrentInstance()

// Import country detection composable
const {
    detectCountry,
    detectedCountry,
    detectionMethod,
    isDetecting,
    getBrowserLocaleCountry,
    detectCountryByIP
} = useCountryDetection()

const formData = ref({
        name: '',
        email: '',
        phone: '',
        country: '',
        license_number: ''
})

const countries = ref([])
const phoneCountryCode = ref()

// Phone detection state
const detectedPhoneCountry = ref('')
const phoneDetectionMethod = ref('')
const showPhoneDebug = ref(true)

const getFormData = () => {
    return { ...formData.value }
}

const onPhoneUpdate = (results) => {
    // Enhanced phone validation with better logging
    console.log('Phone validation results:', results)
    console.log('Current country code:', phoneCountryCode.value)

    // Update detection info
    if (phoneCountryCode.value) {
        detectedPhoneCountry.value = phoneCountryCode.value
        phoneDetectionMethod.value = 'user-input'
    }

    // Optional: Show toast for validation feedback
    if (results && results.isValid) {
        console.log('Valid phone number detected')
        // Could show success toast here
    } else if (formData.value.phone && formData.value.phone.length > 3) {
        console.log('Invalid phone number format')
        // Could show error toast here
    }
}

const rules = {
    name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Invalid email', trigger: 'blur' }
    ],
    phone: [{ required: true, message: 'Phone number is required', trigger: 'blur' }],
    country: [{ required: true, message: 'Country is required', trigger: 'change' }],
    license_number: [{ required: false }]
}


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
            formData.value.country = response.country_name
            console.log('IP Country detected for address:', response.country_code)
        })
        .catch(error => {
            console.log('Failed to get country for address:', error)
        })
}

const initializeForm = async () => {
    console.log('Initializing reservation form...')
    allCountries()
    getCountry()
    const browserCountry = getBrowserLocaleCountry()
    console.log('Browser locale country:', browserCountry)

    if (!phoneCountryCode.value) {
        phoneCountryCode.value = browserCountry
        detectedPhoneCountry.value = browserCountry
        phoneDetectionMethod.value = 'browser-locale'
    }
    try {
        // Try IP detection for more accuracy
        const ipDetected = await detectCountryByIP()
        if (ipDetected && ipDetected !== browserCountry) {
            console.log('Updating phone country to:', ipDetected)
            phoneCountryCode.value = ipDetected
            detectedPhoneCountry.value = ipDetected
            phoneDetectionMethod.value = 'ip-geolocation'
        }
    } catch (error) {
        console.warn('Phone country detection failed:', error)
    }
}

onMounted(() => {
    initializeForm()
})

const validateForm = () => {
    return formRef.value?.validate();
}

defineExpose({
    validateForm,
    getFormData
})
</script>
