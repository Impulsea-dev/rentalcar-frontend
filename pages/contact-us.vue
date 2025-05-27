<template>
  <div class="max-w-4xl mx-auto rounded-xl my-32">
    <!-- Header -->
    <h1 class="text-4xl font-bold text-gray-800 mb-2 text-center">Contact Us</h1>
    <p class="text-lg text-gray-600 mb-6 text-center">Contact Us Today to Book Your Car Rental!</p>
    <p class="text-gray-700 mb-8">
      Let us help you find the ideal vehicle for you to explore and enjoy your stay here in the Cayman Islands.
    </p>

    <!-- Form -->
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="space-y-10"
    >
      <el-form-item label="Your Name" prop="name">
        <el-input v-model="form.name" placeholder="Enter your name" size="large" />
      </el-form-item>

      <el-form-item label="Your Email" prop="email">
        <el-input v-model="form.email" placeholder="Enter your email" size="large" />
      </el-form-item>

      <el-form-item label="Subject" prop="subject">
        <el-input v-model="form.subject" placeholder="Subject" size="large" />
      </el-form-item>

      <el-form-item label="Your Message" prop="message">
        <el-input
          type="textarea"
          v-model="form.message"
          placeholder="Write your message"
          :rows="5"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="large" @click="submitForm">
          Send Message
        </el-button>
      </el-form-item>
    </el-form>

    <!-- Contact Info -->
    <!-- <div class="mt-12 space-y-8">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Economy Car Rental</h2>
        <p class="text-gray-700">P.O. Box 10315<br />Grand Cayman KY1-1003<br />Cayman Islands</p>
        <p class="mt-2 text-gray-700">Ph: (345) 949-9550<br />Fax: (345) 949-1003<br />E-Mail: economy@candw.ky</p>
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Discount Car Rentals</h2>
        <p class="text-gray-700">P.O. Box 10315<br />Grand Cayman, CAYMAN ISLANDS<br />KY1-1003</p>
        <p class="mt-2 text-gray-700">Ph: (345) 943-9550<br />Fax: (345) 949-1003<br />E-Mail: discount@candw.ky</p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// Form state
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// Validation rules
const rules = {
  name: [
    { required: true, message: 'Please enter your name', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: ['blur','change'] },
  ],
  subject: [
    { required: true, message: 'Please enter a subject', trigger: 'blur' },
  ],
  message: [
    { required: true, message: 'Please enter your message', trigger: 'blur' },
  ],
}

// Reference to the form
const formRef = ref(null)

// Handle form submission
function submitForm() {
  formRef.value.validate((valid) => {
    if (valid) {
      // TODO: enviar datos al servidor
      ElMessage.success('Message sent successfully!')
      // Reset form
      form.value = { name: '', email: '', subject: '', message: ''}
    } else {
      ElMessage.error('Please fix the errors in the form.')
    }
  })
}
</script>

<style scoped>
/* No estilos adicionales; todo se maneja con Tailwind y Element Plus */
</style>
