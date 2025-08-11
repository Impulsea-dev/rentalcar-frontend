<template>
    <div class="max-w-7xl mx-auto py-32 px-4">
        <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" v-if="Object.keys(user).length > 0"
            style="max-height: 450px; overflow-y: auto;">
            <span>{{ isNewPayment }}</span>
            <el-tab-pane label="Personal Info" name="personal">
                <PersonalInfoForm :user="user" />
            </el-tab-pane>
            <el-tab-pane label="Payment Info" name="payment">
                <PaymentInfoForm :payment="payment" :payments="payments" :key="payments"
                    @change:isNewPayment="isNewPayment = $event" />
            </el-tab-pane>
            <el-tab-pane label="License Info" name="license">
                <LicenseInfo :user="user" />
            </el-tab-pane>
        </el-tabs>
        <div class="flex justify-end pt-6" v-if="Object.keys(user).length > 0">
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
</template>

<script setup>
import PersonalInfoForm from '@/components/settings/PersonalInfoForm.vue'
import LicenseInfo from '@/components/settings/LicenseInfo.vue'
import PaymentInfoForm from '@/components/settings/PaymentInfoForm.vue'
import { getUserById, updateUserById, getPaymentMethodsForUser, addPaymentMethod } from '@/composables/users'
import { Loading, Edit } from '@element-plus/icons-vue'

definePageMeta({
    middleware: ['auth'],
    layout: 'logged-layout'
})
const auth = JSON.parse(localStorage.getItem('auth'))
const activeTab = ref('personal')
const isNewPayment = ref(false)
const user = reactive({})
const payment = reactive({
    cardholder_name: '',
    last_four: '',
    expiry_month: 12,
    expiry_year: 2025,
    is_default: true,
    provider: '',
    type: 'credit_card',
    card_number: '',
    cvv: ''

})
const payments = ref([])
const isUpdating = ref(false)

const getUserByIdData = async () => {
    await getUserById(auth.user.id, auth.token).then((response) => {
        Object.assign(user, response)
        console.log(user);

    }).catch((error) => {
        console.log(error)
    })
}

const getPaymentMethods = async () => {
    await getPaymentMethodsForUser(auth.user.id, auth.token).then((response) => {
        console.log(response)
        if (response.length > 0) {
            payments.value = response
        }
    }).catch((error) => {
        console.log(error)
    })
}

onMounted(async () => {
    await getUserByIdData()
    await getPaymentMethods()
})

const saveChanges = async () => {
  isUpdating.value = true
  console.log(payment);
  
  try {
    await updateUserById(auth.user.id, user, auth.token)

    if (isNewPayment.value) {
      await addPaymentMethod(auth.user.id, payment, auth.token)
    }

    ElNotification({
      title: 'Success',
      message: 'User information updated successfully',
      type: 'success',
      position: 'bottom-right'
    })
  } catch (error) {
    console.error(error)
    ElNotification({
      title: 'Error',
      message: error.response?.data?.error || 'Something went wrong',
      type: 'error',
      position: 'bottom-right'
    })
  } finally {
    isUpdating.value = false
  }
}

</script>