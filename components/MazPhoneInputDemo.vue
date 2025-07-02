<template>
    <div class="p-8 max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">Maz-UI Phone Number Input Demo</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
            <!-- Basic Auto-detect Example -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Enhanced Auto-Detection</h3>
                <div class="text-sm text-gray-600 mb-2">
                    <p class="font-medium">Auto-detected country: <span class="text-blue-600">{{ countryCodeBasic || 'Detecting...' }}</span></p>
                    <p class="text-xs italic">This input forces browser locale detection</p>
                </div>
                <MazPhoneNumberInput
                    v-model="phoneBasic"
                    v-model:country-code="countryCodeBasic"
                    :no-use-browser-locale="false"
                    :default-country-code="countryCodeBasic || browserLocaleCountry"
                    show-code-on-list
                    @update="onPhoneUpdate"
                    placeholder="Enter phone number"
                    class="w-full"
                />
                <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p><strong>Phone:</strong> {{ phoneBasic }}</p>
                    <p><strong>Country:</strong> {{ countryCodeBasic }}</p>
                    <p><strong>Is Valid:</strong> {{ phoneResults?.isValid ? '✅ Yes' : '❌ No' }}</p>
                    <p><strong>Browser Locale:</strong> {{ browserLocale }}</p>
                </div>
            </div>

            <!-- Force Detection Example -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">IP-Based Detection</h3>
                <div class="text-sm text-gray-600 mb-2">
                    <p class="font-medium">IP Country: <span class="text-green-600">{{ ipCountry || 'Loading...' }}</span></p>
                    <p class="text-xs italic">Using IP geolocation service</p>
                </div>
                <MazPhoneNumberInput
                    v-model="phoneGeo"
                    v-model:country-code="countryCodeGeo"
                    :default-country-code="countryCodeGeo || ipCountry"
                    show-code-on-list
                    :preferred-countries="['US', 'CA', 'GB', 'FR', 'DE', 'ES', 'IT', 'JP', 'AU']"
                    @update="onGeoPhoneUpdate"
                    class="w-full"
                />
                <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p><strong>Detected via IP:</strong> {{ ipCountry }}</p>
                    <p><strong>Selected Country:</strong> {{ countryCodeGeo }}</p>
                    <p><strong>Is Valid:</strong> {{ geoResults?.isValid ? '✅ Yes' : '❌ No' }}</p>
                </div>
            </div>

            <!-- Manual Override Example -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Manual Country Selection</h3>
                <div class="text-sm text-gray-600 mb-2">
                    <p class="text-xs italic">Browser locale disabled - manual selection only</p>
                </div>
                <MazPhoneNumberInput
                    v-model="phoneManual"
                    v-model:country-code="countryCodeManual"
                    :no-use-browser-locale="true"
                    default-country-code="US"
                    show-code-on-list
                    @update="onManualPhoneUpdate"
                    class="w-full"
                />
                <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p><strong>Manual Country:</strong> {{ countryCodeManual }}</p>
                    <p><strong>Format:</strong> {{ manualResults?.formatInternational }}</p>
                </div>
            </div>

            <!-- Dynamic Detection Example -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold">Dynamic Detection</h3>
                <button 
                    @click="resetAndDetect" 
                    class="mb-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                    Reset & Auto-Detect
                </button>
                <MazPhoneNumberInput
                    :key="resetKey"
                    v-model="phoneDynamic"
                    v-model:country-code="countryCodeDynamic"
                    show-code-on-list
                    @update="onDynamicPhoneUpdate"
                    class="w-full"
                />
                <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p><strong>Reset Count:</strong> {{ resetKey }}</p>
                    <p><strong>Current Country:</strong> {{ countryCodeDynamic }}</p>
                </div>
            </div>
        </div>

        <!-- Debug Information -->
        <div class="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Debug Information</h3>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 class="font-semibold mb-2">Browser Info:</h4>
                    <ul class="space-y-1">
                        <li><strong>Navigator Language:</strong> {{ navigatorLanguage }}</li>
                        <li><strong>Navigator Languages:</strong> {{ navigatorLanguages }}</li>
                        <li><strong>Timezone:</strong> {{ timezone }}</li>
                        <li><strong>User Agent:</strong> {{ userAgent }}</li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">Detection Results:</h4>
                    <ul class="space-y-1">
                        <li><strong>Browser Locale Country:</strong> {{ browserLocaleCountry }}</li>
                        <li><strong>IP Country:</strong> {{ ipCountry }}</li>
                        <li><strong>Detected Country:</strong> {{ detectedCountry }}</li>
                        <li><strong>Component Loaded:</strong> {{ componentLoaded ? '✅' : '❌' }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Results Display -->
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Phone Validation Results</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold mb-2">Auto-Detection Results:</h4>
                    <pre class="text-xs overflow-x-auto bg-white p-2 rounded">{{ JSON.stringify(phoneResults, null, 2) }}</pre>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">IP Geolocation Results:</h4>
                    <pre class="text-xs overflow-x-auto bg-white p-2 rounded">{{ JSON.stringify(geoResults, null, 2) }}</pre>
                </div>
            </div>
        </div>

        <!-- Toast Testing Section -->
        <div class="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Toast System Testing</h3>
            <div class="flex flex-wrap gap-2">
                <button @click="showMazSuccessToast" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Maz-UI Success
                </button>
                <button @click="showMazErrorToast" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Maz-UI Error
                </button>
                <button @click="showVueSuccessToast" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Vue3-Toastify Success
                </button>
                <button @click="showVueErrorToast" class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Vue3-Toastify Error
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// Import country detection composable
const { 
    detectedCountry, 
    detectionMethod, 
    isDetecting, 
    browserInfo,
    detectCountry,
    getBrowserLocaleCountry,
    detectCountryByIP
} = useCountryDetection()

// Enhanced state management
const phoneBasic = ref('')
const countryCodeBasic = ref()
const phoneResults = ref(null)

const phoneGeo = ref('')
const countryCodeGeo = ref()
const geoResults = ref(null)

const phoneManual = ref('')
const countryCodeManual = ref('US')
const manualResults = ref(null)

const phoneDynamic = ref('')
const countryCodeDynamic = ref()
const dynamicResults = ref(null)
const resetKey = ref(0)

// Detection state
const ipCountry = ref('')
const componentLoaded = ref(false)

// Browser information (using composable data)
const browserLocale = computed(() => browserInfo.value.language)
const navigatorLanguage = computed(() => browserInfo.value.language)
const navigatorLanguages = computed(() => browserInfo.value.languages?.join(', ') || 'unknown')
const timezone = computed(() => browserInfo.value.timezone)
const userAgent = computed(() => navigator.userAgent.substring(0, 50) + '...')
const browserLocaleCountry = computed(() => getBrowserLocaleCountry())

// Enhanced geolocation detection using composable
const detectIP = async () => {
    try {
        const country = await detectCountryByIP()
        if (country) {
            ipCountry.value = country
            
            // Set geo input country if not already set
            if (!countryCodeGeo.value) {
                countryCodeGeo.value = country
            }
            
            return country
        }
        
        // Fallback to browser locale
        const fallback = browserLocaleCountry.value
        console.log('Using browser locale fallback:', fallback)
        ipCountry.value = fallback
        
        return fallback
    } catch (error) {
        console.error('IP detection failed:', error)
        const fallback = 'US'
        ipCountry.value = fallback
        return fallback
    }
}

// Enhanced reset function
const resetAndDetect = async () => {
    console.log('Resetting and forcing detection...')
    
    // Reset all values
    phoneDynamic.value = ''
    countryCodeDynamic.value = undefined
    dynamicResults.value = null
    
    // Increment key to force component re-render
    resetKey.value++
    
    // Wait for component to re-render
    await nextTick()
    
    // Force detection
    const detected = await detectIP()
    
    // Apply detection after a short delay
    setTimeout(() => {
        if (!countryCodeDynamic.value) {
            countryCodeDynamic.value = detected
        }
    }, 100)
}

// Event handlers with enhanced logging
const onPhoneUpdate = (results) => {
    phoneResults.value = results
    console.log('Basic phone update:', {
        results,
        country: countryCodeBasic.value,
        locale: browserLocale.value
    })
}

const onGeoPhoneUpdate = (results) => {
    geoResults.value = results
    console.log('Geo phone update:', {
        results,
        country: countryCodeGeo.value,
        ipCountry: ipCountry.value
    })
}

const onManualPhoneUpdate = (results) => {
    manualResults.value = results
    console.log('Manual phone update:', {
        results,
        country: countryCodeManual.value
    })
}

const onDynamicPhoneUpdate = (results) => {
    dynamicResults.value = results
    console.log('Dynamic phone update:', {
        results,
        country: countryCodeDynamic.value,
        resetKey: resetKey.value
    })
}

// Toast functions
const mazToast = useToast()
const { $vueToast } = useNuxtApp()

const showMazSuccessToast = () => {
    mazToast.success('✅ Maz-UI: Auto-detection working!')
}

const showMazErrorToast = () => {
    mazToast.error('❌ Maz-UI: Please check country detection')
}

const showVueSuccessToast = () => {
    $vueToast.success('✅ Vue3-Toastify: Detection successful!')
}

const showVueErrorToast = () => {
    $vueToast.error('❌ Vue3-Toastify: Detection failed!')
}

// Enhanced initialization
onMounted(async () => {
    console.log('Enhanced MazPhoneInputDemo mounted')
    console.log('Browser info:', {
        language: navigator.language,
        languages: navigator.languages,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        userAgent: navigator.userAgent.substring(0, 100)
    })
    
    // Set browser locale country for basic input
    const browserCountry = browserLocaleCountry.value
    console.log('Setting browser locale country:', browserCountry)
    countryCodeBasic.value = browserCountry
    
    // Start IP-based detection
    await detectIP()
    
    // Set IP-detected country for geo input
    if (ipCountry.value) {
        countryCodeGeo.value = ipCountry.value
        console.log('Setting IP-detected country:', ipCountry.value)
    }
    
    // Mark component as loaded
    componentLoaded.value = true
    
    // Show detection status
    setTimeout(() => {
        if (ipCountry.value) {
            mazToast.success(`Country detected: ${ipCountry.value}`)
        } else {
            mazToast.warning('Could not detect country automatically')
        }
    }, 1000)
})
</script>

<style scoped>
/* Enhanced demo styles */
pre {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    max-height: 200px;
    overflow-y: auto;
}

.grid {
    gap: 1.5rem;
}

button:hover {
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

.bg-blue-50 {
    background-color: rgb(239 246 255);
}

.bg-green-50 {
    background-color: rgb(240 253 244);
}

.text-blue-600 {
    color: rgb(37 99 235);
}

.text-green-600 {
    color: rgb(22 163 74);
}
</style> 