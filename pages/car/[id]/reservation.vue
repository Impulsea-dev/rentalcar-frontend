<template>
    <div class="px-0 py-24 md:py-32">
        <form-wizard @on-complete="onComplete" color="#000" step-size="sm" finish-button-text="Complete Reservation">
            <tab-content title="User Information" :before-change="goTabLocation">
                <ReservationForm @form-changed="updateFormCompletion" />
            </tab-content>
            <tab-content title="Location & Date">
                My second tab content
            </tab-content>
            <tab-content title="Reservation">
                Yuhuuu! This seems pretty damn simple
            </tab-content>
            <template #prev>
                <button class="my-custom-button mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base italic bg-black text-white transition-all
                 duration-300 hover:bg-black/90">
                    <IconArrowLeft />
                    Go Back
                </button>
            </template>
            <template #next>
                <button class="my-custom-button mt-4 flex justify-center items-center gap-x-2 rounded-full px-6 py-3 text-base italic bg-black text-white transition-all
                 duration-300 hover:bg-black/90">Next
                    <iconRight />
                </button>
            </template>
            <template #finish>
                <button class="my-custom-button mt-4 rounded-full px-4 py-3 text-base italic bg-black text-white transition-all
                 duration-300 hover:bg-black/90">Complete Reservation
                </button>
            </template>
        </form-wizard>
    </div>
</template>

<script setup>
import { FormWizard, TabContent } from "vue3-form-wizard";
import 'vue3-form-wizard/dist/style.css'
const onComplete = () => {
    alert("Yay. Done!");
};
const goTabLocation = () => {
    if (isUserInformationComplete.value) {
        return true;
    }
    else {
        useNuxtApp().$toast.error('Complete all fields of the form!', {
            position: "top-right",
            timeout: 5000,
            theme: 'colored'
        });
        return false;
    }

}
const isUserInformationComplete = ref(false);
const updateFormCompletion = (value) => {
    isUserInformationComplete.value = value;
};

</script>