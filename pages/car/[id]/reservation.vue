<template>
    <div class="px-10 py-10" st>
        <form-wizard @on-complete="onComplete" color="#000" step-size="sm" back-button-text="Go back"
            next-button-text="Go Location" finish-button-text="Complete Reservation">
            <tab-content title="User Information" :before-change="goTabLocation">
                <ReservationForm @form-changed="updateFormCompletion" />
            </tab-content>
            <tab-content title="Location & Date">
                My second tab content
            </tab-content>
            <tab-content title="Reservation">
                Yuhuuu! This seems pretty damn simple
            </tab-content>
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