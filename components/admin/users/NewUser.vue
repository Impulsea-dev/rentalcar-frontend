<template>
    <div>
        <button @click="openModal"
            class="bg-economy text-white rounded px-4 py-2 border border-economy hover:bg-economy/80 transition-all duration-300 font-normal flex justify-center items-center gap-1">
            <el-icon size="14">
                <Plus />
            </el-icon>
            New
            User</button>

        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="absolute top-4 right-4 hover:cursor-pointer z-[1001]" @click="closeModal">
                    <el-icon size="20" color="gray">
                        <CloseBold />
                    </el-icon>
                </div>
                <div class="p-4 flex flex-col flex-grow overflow-y-auto">
                    <el-tabs v-model="activeTab" class="flex-grow overflow-auto">
                        <el-tab-pane label="General Info" name="general">
                            <GeneralForm v-model="user" />
                        </el-tab-pane>
                        <el-tab-pane label="Personal Info" name="personal">
                            <AdditionalForm v-model="user" />
                        </el-tab-pane>
                    </el-tabs>
                    <div class="flex justify-end pt-4">
                        <button @click="saveNewUser"
                            class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all duration-300 hover:opacity-60 gap-x-1">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
        <Transition name="overlay-fade">
            <div v-if="showModal" class="overlay bg-[#111112] bg-opacity-50 fixed inset-0 z-[999]" @click="closeModal">
            </div>
        </Transition>

    </div>
</template>
<script setup>
import { Plus, CloseBold, Close } from '@element-plus/icons-vue'
import AdditionalForm from './AdditionalForm.vue';
import GeneralForm from './GeneralForm.vue';
import { saveUser } from '@/composables/users'
import { ElNotification } from 'element-plus';
const showModal = ref(false)
const activeTab = ref('general')
const user = reactive({
    email: "",
    password: "",
    role: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    id_type: "",
    id_number: "",
    license_number: "",
    license_country: "",
    license_state: "",
    license_class: "",
    license_expiry: ""
})
const userLogged = JSON.parse(localStorage.getItem('auth'))

const saveNewUser = async () => {
    console.log(user);
    await saveUser(user, userLogged.token).then((response) => {
        ElNotification({
            title: 'Success',
            message: 'User created successfully',
            type: 'success',
            position: 'bottom-right'
        })
        closeModal()
    }).catch((error) => {
        console.log(error)
        ElNotification({
            title: 'Error',
            message: error.response.data.error,
            type: 'error',
            position: 'bottom-right'
        })
    })
}


const openModal = () => {
    document.body.style.overflow = 'hidden';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
};

</script>
<style scoped>
@keyframes modal-fade-slide {
    0% {
        opacity: 0;
        transform: translate(-50%, 20px);
    }

    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes overlay-fade {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.modal-fade-enter-active {
    animation: modal-fade-slide 0.24s ease-out forwards;
}

.modal-fade-leave-active {
    animation: modal-fade-slide 0.24s ease-in reverse forwards;
}

.overlay-fade-enter-active {
    animation: overlay-fade 0.3s ease-out forwards;
}

.overlay-fade-leave-active {
    animation: overlay-fade 0.3s ease-in reverse forwards;
}
</style>