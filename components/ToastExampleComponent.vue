<template>
    <div class="p-6 bg-gray-50 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">📝 Component Usage Examples</h3>
        
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Formulario con Maz-UI Toast -->
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold mb-3 text-blue-600">🚀 With Maz-UI Toast</h4>
                <div class="space-y-3">
                    <input 
                        v-model="formData1.name" 
                        placeholder="Name" 
                        class="w-full p-2 border rounded"
                    >
                    <input 
                        v-model="formData1.email" 
                        placeholder="Email" 
                        class="w-full p-2 border rounded"
                    >
                    <button 
                        @click="saveMazForm" 
                        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Save (Maz Toast)
                    </button>
                </div>
            </div>

            <!-- Formulario con Vue3-Toastify -->
            <div class="bg-white p-4 rounded border">
                <h4 class="font-semibold mb-3 text-purple-600">📢 With Vue3-Toastify</h4>
                <div class="space-y-3">
                    <input 
                        v-model="formData2.name" 
                        placeholder="Name" 
                        class="w-full p-2 border rounded"
                    >
                    <input 
                        v-model="formData2.email" 
                        placeholder="Email" 
                        class="w-full p-2 border rounded"
                    >
                    <button 
                        @click="saveVueForm" 
                        class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                        Save (Vue Toast)
                    </button>
                </div>
            </div>
        </div>

        <!-- Código de ejemplo -->
        <div class="mt-6">
            <h4 class="font-semibold mb-3">💻 Example Code:</h4>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <h5 class="text-sm font-semibold text-blue-600 mb-2">Maz-UI Toast:</h5>
                    <pre class="text-xs bg-gray-100 p-3 rounded overflow-x-auto"><code>// In your component
const toast = useToast()

// Usage
toast.success('Saved successfully!')
toast.error('Error saving')
toast.warning('Warning')
toast.info('Information')</code></pre>
                </div>
                <div>
                    <h5 class="text-sm font-semibold text-purple-600 mb-2">Vue3-Toastify:</h5>
                    <pre class="text-xs bg-gray-100 p-3 rounded overflow-x-auto"><code>// In your component
const { $vueToast } = useNuxtApp()

// Usage
$vueToast.success('Saved successfully!')
$vueToast.error('Error saving')
$vueToast.warn('Warning')
$vueToast.info('Information')</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Formularios de ejemplo
const formData1 = ref({ name: '', email: '' })
const formData2 = ref({ name: '', email: '' })

// Toast systems
const mazToast = useToast()  // Maz-UI
const { $vueToast } = useNuxtApp()  // Vue3-Toastify

// Funciones de guardado
const saveMazForm = () => {
    if (!formData1.value.name || !formData1.value.email) {
        mazToast.error('❌ Please complete all fields')
        return
    }
    
    // Simulate saving
    setTimeout(() => {
        mazToast.success('✅ Form saved with Maz-UI Toast!')
        formData1.value = { name: '', email: '' }
    }, 500)
}

const saveVueForm = () => {
    if (!formData2.value.name || !formData2.value.email) {
        $vueToast.error('❌ Please complete all fields')
        return
    }
    
    // Simulate saving
    setTimeout(() => {
        $vueToast.success('✅ Form saved with Vue3-Toastify!')
        formData2.value = { name: '', email: '' }
    }, 500)
}
</script>

<style scoped>
code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style> 