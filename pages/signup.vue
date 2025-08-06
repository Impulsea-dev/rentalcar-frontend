<template>
  <section class="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 mt-10">
    <div class="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-10">
      <h1 class="text-2xl font-bold text-center text-[#212529] mb-8">Create Your Account</h1>

      <el-form @submit.prevent="handleRegister" label-position="top" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <el-form-item label="First Name">
          <el-input v-model="form.first_name" placeholder="John" size="large" />
        </el-form-item>

        <el-form-item label="Last Name">
          <el-input v-model="form.last_name" placeholder="Doe" size="large" />
        </el-form-item>

        <el-form-item label-position="top">
          <template #label>
            <label class="text-sm text-gray-700 font-semibold">
              Phone
            </label>
          </template>
          <div class="w-full">
            <MazPhoneNumberInput v-model="form.phone" show-code-on-list
              :preferred-countries="['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'ES', 'IT']"
              class="w-full max-w-full !min-w-0" />
          </div>
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="you@example.com" size="large" />
        </el-form-item>
        <el-form-item label="Gender">
          <el-select v-model="form.gender" placeholder="Select gender" size="large">
            <el-option label="Male" value="male" />
            <el-option label="Female" value="female" />
          </el-select>
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="form.password" :type="showPassword ? 'text' : 'password'" size="large" placeholder="••••••"
            suffix-icon="View" @suffix-icon-click="showPassword = !showPassword" />
        </el-form-item>

        <el-form-item label="ID Type">
          <el-select v-model="form.id_type" placeholder="Select ID type" size="large">
            <el-option label="Passport" value="passport" />
            <el-option label="Driver's License" value="drivers_license" />
            <el-option label="ID Card" value="id_card" />
          </el-select>
        </el-form-item>

        <el-form-item label="ID Number">
          <el-input v-model="form.id_number" placeholder="ID Number" size="large" />
        </el-form-item>

        <el-form-item label="License Class">
          <el-select v-model="form.license_class" placeholder="Select license class" size="large">
            <el-option label="A" value="a" />
            <el-option label="B" value="b" />
            <el-option label="C" value="c" />
            <el-option label="D" value="d" />
          </el-select>
        </el-form-item>

        <el-form-item label="License Number">
          <el-input v-model="form.license_number" placeholder="ABC-12345" size="large" />
        </el-form-item>


        <el-form-item label="License Expiry Date">
          <el-date-picker v-model="form.license_expiry" type="date" placeholder="YYYY-MM-DD" size="large"
            style="width: 100%" value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="License Country">
          <el-select v-model="form.license_country" placeholder="Select country" filterable size="large">
            <el-option v-for="country in countries" :key="country" :label="country" :value="country" />
          </el-select>
        </el-form-item>

        <div class="md:col-span-3">
          <el-button type="primary" class="w-full !bg-[#00BEA1] hover:!bg-opacity-90" size="large"
            :loading="isRegistering" native-type="submit">
            Create Account
          </el-button>
        </div>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { getAllCountries } from "@/utils/index";
import { saveNewAccount } from '@/composables/users';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
const router = useRouter()

const showPassword = ref(false)
const isRegistering = ref(false)

const form = ref({
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
  license_expiry: "",
  role: "customer"
})

const countries = ref([]);

onMounted(() => {
  getCountry()
})


const handleRegister = async () => {
  isRegistering.value = true
  await saveNewAccount(form.value).then((response) => {
    console.log(response);
    ElNotification({
      title: 'Success',
      message: 'Account created successfully',
      type: 'success',
      position: 'bottom-right'
    })
    router.push('/login')
  }).catch((error) => {
    console.log(error)
    ElNotification({
      title: 'Error',
      message: error.response.data.error,
      type: 'error',
      position: 'bottom-right'
    })
  }).finally(() => {
    isRegistering.value = false
  })
}

const getCountry = () => {
  getAllCountries()
    .then(response => {
      countries.value = response
    })
    .catch(error => {
      console.error(error)
    })
}
</script>
