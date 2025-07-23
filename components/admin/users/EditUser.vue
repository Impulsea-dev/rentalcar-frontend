<template>
    <div>
        <Transition name="modal-fade-slide">
            <div class="fixed left-1/2 top-0 transform -translate-x-1/2 w-[800px] bg-[#f5f8fa] h-[calc(100vh-4rem)] z-[1000] shadow-base3 rounded-xl mt-8 flex flex-col"
                v-show="showModal">
                <div class="p-4 flex flex-col flex-grow overflow-hidden">
                    <div class="absolute top-4 right-4 hover:cursor-pointer z-[1001]" @click="closeModal">
                        <el-icon size="20" color="gray">
                            <CloseBold />
                        </el-icon>
                    </div>
                    <el-tabs v-model="activeTab" class="flex-grow overflow-auto"
                        v-if="visible && Object.keys(localUser).length > 0">
                        <el-tab-pane label="General Info" name="general">
                            <GeneralFormEdit v-model="localUser" />
                        </el-tab-pane>
                        <el-tab-pane label="Additional Info" name="additional">
                            <AdditionalFormEdit v-model="localUser" />
                        </el-tab-pane>
                    </el-tabs>

                    <div class="flex justify-end pt-4">
                        <button @click="saveChanges"
                            class="flex justify-center items-center rounded-md px-4 py-2 text-sm bg-economy text-white transition-all duration-300 hover:opacity-60 gap-x-1">
                            <el-icon v-if="isUpdating" class="animate-spin" size="16">
                                <Loading />
                            </el-icon>
                            <el-icon v-else size="16">
                                <Edit />
                            </el-icon>
                            Update
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
import { ref, watch, reactive } from 'vue'
import { Loading, Edit, CloseBold } from '@element-plus/icons-vue'
import AdditionalFormEdit from './AdditionalFormEdit.vue';
import GeneralFormEdit from './GeneralFormEdit.vue';
import { getUserById, updateUserById } from "@/composables/users";
import { lo } from 'element-plus/es/locale';

const props = defineProps({
    user: Object,
    visible: Boolean
})

const showModal = ref(false)
const emit = defineEmits(['close'])
const localUser = reactive({})
const userLogged = JSON.parse(localStorage.getItem('auth'))

const isUpdating = ref(false)

watch(() => props.visible, (val) => {
    if (val && props.user) {
        getUserByIdData()
        openModal()
    }
})

const openModal = () => {
    document.body.style.overflow = 'hidden';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
    emit('close')
};
const activeTab = ref('general')


const saveChanges = async () => {
    isUpdating.value = true
    console.log(localUser);
    
    await updateUserById(props.user.public_id, localUser, userLogged.token).then((response) => {
        ElNotification({
            title: 'Success',
            message: 'User updated successfully',
            type: 'success'
        })
        closeModal()
    }).catch((error) => {
        console.log(error)
        ElNotification({
            title: 'Error',
            message: error.response.data.error,
            type: 'error'
        })
    }).finally(() => {
        isUpdating.value = false
    })
}

const getUserByIdData = async () => {
    await getUserById(props.user.public_id, userLogged.token).then((response) => {
        Object.assign(localUser, response)
        console.log(localUser);
    }).catch((error) => {
        console.log(error)
    })
}
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
