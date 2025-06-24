<template>
    <div>
        <el-table :data="vehicles" style="width: 100%">
            <!-- <el-table-column prop="id" label="ID" width="80" /> -->
            <el-table-column prop="class" label="Class" />
            <el-table-column prop="brand.name" label="Brand" />
            <el-table-column prop="model" label="Model" />
            <el-table-column prop="daily_rate.text" label="Price" />
            <el-table-column prop="color" label="Color" />
            <el-table-column prop="year" label="Year" />
            <el-table-column label="Actions">
                <template #default="scope">
                    <el-button size="small" @click="editVehicle(scope.row)">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getVehicles } from '@/composables/vehicles'
const vehicles = ref([])

onMounted(async () => {
    await getVehiclesData()
})

const getVehiclesData = async () => {
    await getVehicles(1, 20, '', '', '', '').then((response) => {
        vehicles.value = response.data.items
    }).catch((error) => {
        console.log(error)
    })
}

const editVehicle = (vehicle) => {
    // Puede emitir a un store o usar un modal o cambiar de tab con datos cargados
    console.log('Editing vehicle', vehicle)
}
</script>
