/**
 * Phone validation utility with Maz-UI toast integration
 */

export const usePhoneValidator = () => {
  const toast = useToast()

  /**
   * Validate phone number and show appropriate toast
   * @param {Object} results - Phone validation results from Maz-UI
   * @param {boolean} showToasts - Whether to show toast notifications (default: false)
   * @returns {boolean} - Whether the phone number is valid
   */
  const validatePhone = (results, showToasts = false) => {
    if (!results) return false

    const isValid = results.isValid

    if (showToasts) {
      if (isValid) {
        toast.success(`✅ Valid ${results.type?.toLowerCase() || 'phone'} number`)
      } else if (results.phoneNumber && typeof results.phoneNumber === 'string' && results.phoneNumber.length > 3) {
        toast.error('❌ Invalid phone number format')
      }
    }

    return isValid
  }

  /**
   * Format phone number for display
   * @param {Object} results - Phone validation results from Maz-UI
   * @param {string} format - Format type: 'international', 'national', 'e164'
   * @returns {string} - Formatted phone number
   */
  const formatPhone = (results, format = 'international') => {
    if (!results || !results.isValid) return ''

    switch (format) {
      case 'international':
        return results.formatInternational || ''
      case 'national':
        return results.formatNational || ''
      case 'e164':
        return results.e164 || ''
      default:
        return results.formatInternational || ''
    }
  }

  /**
   * Get phone number metadata
   * @param {Object} results - Phone validation results from Maz-UI
   * @returns {Object} - Phone metadata
   */
  const getPhoneMetadata = (results) => {
    if (!results) return null

    return {
      isValid: results.isValid,
      countryCode: results.countryCode,
      type: results.type,
      formatted: {
        international: results.formatInternational,
        national: results.formatNational,
        e164: results.e164,
        uri: results.uri
      }
    }
  }

  return {
    validatePhone,
    formatPhone,
    getPhoneMetadata
  }
}

/**
 * Phone number validation composable for forms
 */
export const usePhoneForm = () => {
  const { validatePhone, formatPhone, getPhoneMetadata } = usePhoneValidator()
  
  const phoneResults = ref(null)
  const isPhoneValid = computed(() => phoneResults.value?.isValid || false)
  
  const onPhoneUpdate = (results) => {
    phoneResults.value = results
    return validatePhone(results)
  }
  
  const getFormattedPhone = (format = 'international') => {
    return formatPhone(phoneResults.value, format)
  }
  
  return {
    phoneResults,
    isPhoneValid,
    onPhoneUpdate,
    getFormattedPhone,
    getPhoneMetadata: () => getPhoneMetadata(phoneResults.value)
  }
} 