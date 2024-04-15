<template>
    <div class="flex flex-col items-center my-10">
        <span class="text-xl font-bold">Please fill out this Information in order to serve the desired car</span>
        <form class="flex flex-col gap-6 my-4">
            <div>
                <label for="first_name" class="block text-base italic font-medium">First name</label>
                <input v-model="formData.fname" type="text" id="first_name"
                    class="bg-gray-50 border border-black text-sm rounded-lg block w-96 p-2.5" />
            </div>
            <div>
                <label for="last_name" class="block text-base italic font-medium">Last
                    name</label>
                <input v-model="formData.lname" type="text" id="last_name"
                    class="bg-gray-50 border border-black text-sm rounded-lg block w-96 p-2.5" />
            </div>
            <div>
                <label for="email" class="block text-base italic font-medium">Email</label>
                <input v-model="formData.email" type="email" id="email"
                    class="bg-gray-50 border border-black text-sm rounded-lg block w-96 p-2.5" />
            </div>
            <div>
                <label for="phone" class="block text-base italic font-medium">Phone</label>
                <client-only>
                    <vue-tel-input v-if="countrycode" v-model="formData.phone" @validate="phoneObject"
                        :mode="'international'" :defaultCountry="countrycode.trim()"
                        :invalidMsg="'Please enter a valid phone number'" validCharactersOnly
                        class="p-1.5 !rounded !border !border-black" :dropdownOptions="{
                    disabled: false, showDialCodeInList: false, showDialCodeInSelection: false,
                    showFlags: true, showSearchBox: true, tabindex: 0
                }"></vue-tel-input>
                </client-only>
            </div>
            <div>
                <label for="country" class="block text-base italic font-medium">Country</label>
                <select name="country" id="country" v-model="formData.country"
                    class="bg-gray-50 border border-black text-sm rounded-lg block w-96 p-2.5">
                    <option v-for="country in countries">{{ country }}</option>
                </select>
            </div>
            <div>
                <label for="street" class="block text-base italic font-medium">Street Address</label>
                <input v-model="formData.saddress" type="text" id="street"
                    class="bg-gray-50 border border-black text-sm rounded-lg block w-96 p-2.5" />
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { getAllCountries, getCurrentCountry } from "~/utils/"
const instance = getCurrentInstance();
const formData = ref({
    fname: null,
    lname: null,
    email: null,
    phone: null,
    country: null,
    saddress: null
});
const countries = ref(null)
const countrycode = ref(null)
const phoneObject = (object) => {
    // console.log(object);
    // this.isValid = object.valid;
}

watch(formData.value, () => {
    const isFormComplete = Object.values(formData.value).every(value => value !== null && value !== "");
    isFormComplete ? instance.emit('form-changed', isFormComplete) : null
});
const allCountries = () => {
    getAllCountries().then(response => {
        countries.value = response
    }).catch(error => {
        console.error(error);
    });
}
const getCountry = () => {
    getCurrentCountry().then((response) => {
        formData.value.country = response.country_name
        countrycode.value = response.country_code
    }).catch((error) => {
        console.log(error);
    })
}
allCountries()
getCountry()
</script>