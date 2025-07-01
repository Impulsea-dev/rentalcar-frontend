<template>
    <div>
        <div class="flex items-center justify-end mb-6 gap-4">
            <NewReservation />
            <el-input v-model="search" placeholder="Search here..." clearable class="search-input" size="large">
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
    </div>
</template>
<script setup>
import NewReservation from './NewReservation.vue';
import { Search } from '@element-plus/icons-vue'
const search = ref('')
</script>
<style scoped>
.search-input {
    width: 240px;
}
</style>