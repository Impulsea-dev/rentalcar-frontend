<template>
    <el-form label-position="top" class="grid md:grid-cols-2 gap-4">
        <el-form-item label="Promotion Code">
            <el-input v-model="modelValue.code" placeholder="PROMO2025" size="large" />
        </el-form-item>

        <el-form-item label="Name">
            <el-input v-model="modelValue.name" placeholder="Summer Discount" size="large" />
        </el-form-item>

        <el-form-item label="Description">
            <el-input v-model="modelValue.description" type="textarea" :rows="5" placeholder="Promotion details..." />
        </el-form-item>

        <el-form-item label="Start Date">
            <el-date-picker v-model="modelValue.start_date" type="datetime" placeholder="Select start date"
                style="width: 100%;" size="large" />
        </el-form-item>

        <el-form-item label="End Date">
            <el-date-picker v-model="modelValue.end_date" type="datetime" placeholder="Select end date"
                style="width: 100%;" size="large" />
        </el-form-item>

        <el-form-item label="Type">
            <el-select v-model="modelValue.type" placeholder="Select type" size="large" class="w-full">
                <el-option label="Discount" value="discount" />
                <el-option label="Upgrade" value="upgrade" />
                <el-option label="Bundle" value="bundle" />
                <el-option label="Other" value="other" />
            </el-select>
        </el-form-item>

        <el-form-item label="Value">
            <el-input-number v-model="modelValue.value.value" :min="0" :step="1" size="large" style="width: 100%;">
                <template #prefix>$</template>
            </el-input-number>
        </el-form-item>

        <el-form-item label="Conditions (optional)">
            <el-input v-model="conditionInput" placeholder="Press Enter to add" size="large"
                @keyup.enter="addCondition" />
            <div class="mt-2 flex flex-wrap gap-2">
                <el-tag v-for="(item, index) in modelValue.conditions" :key="index" closable
                    @close="removeCondition(index)">
                    {{ item }}
                </el-tag>
            </div>
        </el-form-item>
        <el-form-item label="Is Active">
            <el-switch v-model="modelValue.is_active" active-color="#00BEA1"/>
        </el-form-item>
    </el-form>
</template>
<script setup>
const props = defineProps({
    modelValue: Object,
})

const conditionInput = ref('')

const addCondition = () => {
    if (conditionInput.value.trim()) {
        props.modelValue.conditions.push(conditionInput.value.trim())
        conditionInput.value = ''
    }
}

const removeCondition = (index) => {
    props.modelValue.conditions.splice(index, 1)
}
</script>
