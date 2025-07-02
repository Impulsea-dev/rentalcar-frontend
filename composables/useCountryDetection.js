import { ref, computed } from 'vue'

export const useCountryDetection = () => {
    const detectedCountry = ref('')
    const detectionMethod = ref('')
    const isDetecting = ref(false)
    const detectionError = ref('')

    // Browser info
    const browserInfo = computed(() => ({
        language: navigator.language || 'unknown',
        languages: navigator.languages || [],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
        platform: navigator.platform || 'unknown'
    }))

    // Extract country from browser locale
    const getBrowserLocaleCountry = () => {
        try {
            const locale = navigator.language || 'en-US'
            const country = locale.split('-')[1]?.toUpperCase()
            console.log('Browser locale country:', country)
            return country || 'US'
        } catch (error) {
            console.warn('Error getting browser locale:', error)
            return 'US'
        }
    }

    // Detect country using timezone
    const getTimezoneCountry = () => {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            console.log('Timezone:', timezone)
            
            // Simple timezone to country mapping for common cases
            const timezoneMap = {
                'America/New_York': 'US',
                'America/Los_Angeles': 'US',
                'America/Chicago': 'US',
                'America/Denver': 'US',
                'America/Toronto': 'CA',
                'America/Vancouver': 'CA',
                'Europe/London': 'GB',
                'Europe/Paris': 'FR',
                'Europe/Berlin': 'DE',
                'Europe/Madrid': 'ES',
                'Europe/Rome': 'IT',
                'Asia/Tokyo': 'JP',
                'Australia/Sydney': 'AU',
                'Australia/Melbourne': 'AU'
            }
            
            const country = timezoneMap[timezone]
            if (country) {
                console.log('Timezone country detected:', country)
                return country
            }
            
            // Fallback: extract from timezone string
            if (timezone.includes('America/')) return 'US'
            if (timezone.includes('Europe/')) return 'GB'
            if (timezone.includes('Asia/')) return 'JP'
            if (timezone.includes('Australia/')) return 'AU'
            
            return null
        } catch (error) {
            console.warn('Error getting timezone country:', error)
            return null
        }
    }

    // Detect country using IP geolocation
    const detectCountryByIP = async () => {
        try {
            console.log('Starting IP-based detection...')
            
            const services = [
                {
                    url: 'https://ipapi.co/json/',
                    extractCountry: (data) => data.country_code
                },
                {
                    url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
                    extractCountry: (data) => data.country_code2
                },
                {
                    url: 'https://httpbin.org/json',
                    extractCountry: () => null // Fallback service
                }
            ]
            
            for (const service of services) {
                try {
                    console.log(`Trying service: ${service.url}`)
                    
                    const controller = new AbortController()
                    const timeoutId = setTimeout(() => controller.abort(), 5000)
                    
                    const response = await fetch(service.url, {
                        signal: controller.signal,
                        headers: {
                            'Accept': 'application/json',
                        }
                    })
                    
                    clearTimeout(timeoutId)
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`)
                    }
                    
                    const data = await response.json()
                    const country = service.extractCountry(data)
                    
                    if (country) {
                        console.log(`IP detection successful: ${country}`)
                        return country.toUpperCase()
                    }
                } catch (error) {
                    console.warn(`Service ${service.url} failed:`, error.message)
                    continue
                }
            }
            
            throw new Error('All IP services failed')
        } catch (error) {
            console.error('IP detection failed:', error)
            return null
        }
    }

    // Main detection function
    const detectCountry = async () => {
        if (isDetecting.value) {
            console.log('Detection already in progress...')
            return detectedCountry.value
        }

        isDetecting.value = true
        detectionError.value = ''
        
        try {
            console.log('Starting comprehensive country detection...')
            
            // Method 1: Browser locale
            const browserCountry = getBrowserLocaleCountry()
            if (browserCountry) {
                detectedCountry.value = browserCountry
                detectionMethod.value = 'browser-locale'
                console.log(`Detected via browser locale: ${browserCountry}`)
            }
            
            // Method 2: Timezone (as backup)
            const timezoneCountry = getTimezoneCountry()
            if (timezoneCountry && !detectedCountry.value) {
                detectedCountry.value = timezoneCountry
                detectionMethod.value = 'timezone'
                console.log(`Detected via timezone: ${timezoneCountry}`)
            }
            
            // Method 3: IP Geolocation (most accurate but async)
            try {
                const ipCountry = await detectCountryByIP()
                if (ipCountry) {
                    // IP detection takes precedence if successful
                    detectedCountry.value = ipCountry
                    detectionMethod.value = 'ip-geolocation'
                    console.log(`Final detection via IP: ${ipCountry}`)
                }
            } catch (error) {
                console.warn('IP detection failed, using fallback')
            }
            
            // Final fallback
            if (!detectedCountry.value) {
                detectedCountry.value = 'US'
                detectionMethod.value = 'fallback'
                console.log('Using fallback country: US')
            }
            
            return detectedCountry.value
            
        } catch (error) {
            console.error('Country detection failed:', error)
            detectionError.value = error.message
            detectedCountry.value = 'US'
            detectionMethod.value = 'error-fallback'
            return 'US'
        } finally {
            isDetecting.value = false
        }
    }

    // Reset detection
    const resetDetection = () => {
        detectedCountry.value = ''
        detectionMethod.value = ''
        detectionError.value = ''
        isDetecting.value = false
    }

    // Get detection info
    const getDetectionInfo = () => ({
        country: detectedCountry.value,
        method: detectionMethod.value,
        error: detectionError.value,
        isDetecting: isDetecting.value,
        browserInfo: browserInfo.value
    })

    return {
        // Reactive state
        detectedCountry,
        detectionMethod,
        isDetecting,
        detectionError,
        browserInfo,
        
        // Methods
        detectCountry,
        resetDetection,
        getDetectionInfo,
        getBrowserLocaleCountry,
        getTimezoneCountry,
        detectCountryByIP
    }
} 