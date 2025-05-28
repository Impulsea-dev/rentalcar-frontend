<template>
    <div class="flex flex-col items-center my-10">
        <span class="text-lg font-normal text-center max-w-xl">
            Please fill out this Information in order to serve the desired car
        </span>

        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top"
            class="flex flex-col gap-6 my-8 w-96">
            <el-form-item label="First Name" prop="fname">
                <el-input v-model="formData.fname" placeholder="Enter your first name" size="large" />
            </el-form-item>

            <el-form-item label="Last Name" prop="lname">
                <el-input v-model="formData.lname" placeholder="Enter your last name" size="large" />
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="formData.email" type="email" placeholder="Enter your email" size="large" />
            </el-form-item>

            <el-form-item label="Phone" prop="phone">
                <client-only>
                    <vue-tel-input v-if="countrycode" v-model="formData.phone" @validate="phoneObject"
                        :mode="'international'" :defaultCountry="countrycode.trim()"
                        :invalidMsg="'Please enter a valid phone number'" validCharactersOnly
                        class="h-10 !rounded w-full" :dropdownOptions="{
                            disabled: false,
                            showDialCodeInList: false,
                            showDialCodeInSelection: false,
                            showFlags: true,
                            showSearchBox: true,
                            tabindex: 0
                        }" />
                </client-only>
            </el-form-item>

            <el-form-item label="Country" prop="country">
                <el-select v-model="formData.country" placeholder="Select your country" size="large">
                    <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
                </el-select>
            </el-form-item>

            <el-form-item label="Street Address" prop="saddress">
                <el-input v-model="formData.saddress" placeholder="Enter your street address" size="large" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { getAllCountries, getCurrentCountry } from '~/utils/'

const formRef = ref(null)
const instance = getCurrentInstance()

const formData = ref({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    country: '',
    saddress: ''
})

const countries = ref([])
const countrycode = ref(null)

const getFormData = () => {
  return { ...formData.value }
}


const phoneObject = () => {
    // Puedes implementar validación adicional del número si lo necesitas
}

const rules = {
    fname: [{ required: true, message: 'First name is required', trigger: 'blur' }],
    lname: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Invalid email', trigger: 'blur' }
    ],
    phone: [{ required: true, message: 'Phone number is required', trigger: 'blur' }],
    country: [{ required: true, message: 'Country is required', trigger: 'change' }],
    saddress: [{ required: true, message: 'Street address is required', trigger: 'blur' }]
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
            countrycode.value = response.country_code
        })
        .catch(error => {
            console.log(error)
        })
}

allCountries()
getCountry()

const validateForm = () => {
    return formRef.value?.validate();
}

defineExpose({
    validateForm,
    getFormData
})
</script>
