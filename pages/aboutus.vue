<template>
    <section class="bg-white py-40 px-6 md:px-16">
        <div class="max-w-4xl mx-auto text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">About Economy Car Rentals</h1>
            <p class="text-lg text-gray-600">
                We have the perfect vehicle to fit your needs! Our goal is to give you complete freedom to explore our
                beautiful Cayman Islands with reliable, clean rental cars and exceptional customer service.
            </p>
        </div>

        <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center mb-12">
            <div>
                <p class="text-5xl font-extrabold text-primary">1,109</p>
                <p class="mt-2 text-gray-700">Trips Completed</p>
            </div>
            <div>
                <p class="text-5xl font-extrabold text-primary">7,010</p>
                <p class="mt-2 text-gray-700">Happy Customers</p>
            </div>
        </div>

        <div class="max-w-4xl mx-auto space-y-6 mb-12">
            <p class="text-gray-700">
                Economy Car Rentals was founded in 1990 with a humble fleet of just 27 cars. In 2007, we launched
                Discount Car Rental as our sister brand, bringing even more value and specialist Hyundai automobiles to
                Grand Cayman.
            </p>
            <p class="text-gray-700">
                We’re open 365 days a year, conveniently located next to Owen Roberts International Airport, from 6:30
                AM to 6:00 PM. Late arrivals? No problem—we’ll make special arrangements to meet you after hours.
            </p>
        </div>

        <div class="max-w-4xl mx-auto text-center mb-12">
            <p class="text-xl font-semibold text-gray-800">Call Today: <a href="tel:+13459499550"
                    class="text-primary hover:underline">345-949-9550</a> / <a href="tel:+13459439550"
                    class="text-primary hover:underline">345-943-9550</a></p>
        </div>


        <div class="max-w-4xl mx-auto text-center mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Guarantee</h2>
            <p class="text-gray-700">
                We guarantee the newest, cleanest, and most reliable rental cars available anywhere on the island.
            </p>
        </div>

        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">Contact Information</h3>
                <p><strong>Phone:</strong> <a href="tel:+13459499550" class="text-gray-700">345-949-9550</a>, <a
                        href="tel:+13459439550" class="text-gray-700">345-943-9550</a></p>
                <p><strong>Address:</strong> Airport Plaza, Roberts Drive, George Town, Grand Cayman, KY1-1003</p>
                <p><strong>Hours:</strong> Mon-Fri: 8:00 AM - 5:00 PM</p>
            </div>
            <div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Newsletter</h3>
                <p class="text-gray-600 mb-4">Don't miss a thing! Sign up to receive daily deals.</p>
                <el-form @submit.native.prevent="subscribe" ref="formRef">
                    <div class="flex items-start gap-2">
                        <el-form-item prop="email" class="flex-1">
                            <el-input v-model="email" type="email" placeholder="Your email address" class="w-full" />
                        </el-form-item>
                        <el-button type="primary" native-type="submit">Subscribe</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const email = ref('')
const formRef = ref(null)

function subscribe() {
    if (!email.value) {
        ElMessage.error('Please enter a valid email address.')
        return
    }
    // Aquí puedes integrar tu lógica de suscripción (API call)
    ElMessage.success('Thank you for subscribing!')
    email.value = ''
}
</script>

<style scoped>
/* Colores primarios personalizados con Tailwind config */
.text-primary {
    @apply text-blue-600;
}

.bg-primary {
    @apply bg-blue-600;
}
</style>
