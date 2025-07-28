<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Payment Type">
            <el-select v-model="modelValue.payment_info.type" placeholder="Select payment method" size="large">
                <el-option label="Credit Card" value="credit_card" />
                <el-option label="PayPal" value="paypal" />
                <el-option label="Cash" value="cash" />
            </el-select>
        </el-form-item>

        <!-- Mostrar solo si se elige tarjeta -->
        <template v-if="modelValue.payment_info.type === 'credit_card'">
            <el-form-item label="Card Provider">
                <el-select v-model="modelValue.payment_info.provider" placeholder="Visa, MasterCard..." size="large">
                    <el-option label="Visa" value="visa" />
                    <el-option label="MasterCard" value="mastercard" />
                    <el-option label="Amex" value="amex" />
                </el-select>
            </el-form-item>

            <el-form-item label="Cardholder Name">
                <el-input v-model="modelValue.payment_info.cardholder_name" placeholder="John Doe" size="large" />
            </el-form-item>

            <el-form-item label="Last 4 Digits">
                <el-input v-model="modelValue.payment_info.last_four" maxlength="4" placeholder="1234" size="large" />
            </el-form-item>

            <el-form-item label="Expiry Month">
                <el-input-number v-model="modelValue.payment_info.expiry_month" :min="1" :max="12" size="large" />
            </el-form-item>

            <el-form-item label="Expiry Year">
                <el-input-number v-model="modelValue.payment_info.expiry_year" :min="2024" :max="2040" size="large" />
            </el-form-item>

            <el-form-item>
                <el-checkbox v-model="modelValue.payment_info.is_default" label="Use as default card" />
            </el-form-item>
        </template>

    </el-form>
</template>

<script setup>
const props = defineProps({ modelValue: Object })
</script>
