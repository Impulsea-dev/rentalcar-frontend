<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <el-form-item label="Class" label-position="top">
      <el-input v-model="modelValue.class" placeholder="e.g. Economy" size="large" />
    </el-form-item>
    <el-form-item label="Brand Name" label-position="top">
      <el-input v-model="modelValue.brand_name" placeholder="e.g. Toyota" size="large" />
    </el-form-item>
    <el-form-item label="VIN" label-position="top">
      <el-input v-model="modelValue.vin" placeholder="e.g. 1A2B3C4D5E6F7G8H9I0J" size="large" />
    </el-form-item>
    <el-form-item label="Model" label-position="top">
      <el-input v-model="modelValue.model" placeholder="e.g. Corolla" size="large" />
    </el-form-item>
    <el-form-item label="Color" label-position="top">
      <el-input v-model="modelValue.color" placeholder="e.g. Red" size="large" />
    </el-form-item>
    <el-form-item label="Year" label-position="top">
      <el-input-number v-model="modelValue.year" :min="1980" :max="new Date().getFullYear()" size="large"
        style="width: 100%;" />
    </el-form-item>
    <el-form-item label="Capacity" label-position="top">
      <el-input-number v-model="modelValue.capacity" :min="1" :max="10" size="large" style="width: 100%;" />
    </el-form-item>

    <el-form-item label="Plate" label-position="top">
      <el-input v-model="modelValue.plate" placeholder="e.g. ABC-123" size="large" />
    </el-form-item>
    <el-form-item label="Vehicle Images" label-position="top" class="md:col-span-2">
      <el-upload class="upload-demo" drag multiple action="" :auto-upload="false" :on-change="handleImageChange" :on-remove="handleImageRemove"
        :file-list="imageFileList" accept="image/*" list-type="picture-card">
        <i class="el-icon-upload" />
        <div class="el-upload__text">Drop files here or <em>click to upload</em></div>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const imageFileList = ref([])

onMounted(() => {
  if (props.modelValue.images?.length) {
    imageFileList.value = props.modelValue.images.map((img, index) => ({
      name: `image-${index + 1}.jpg`,
      url: img,
      status: 'finished'
    }))
  }
})


const handleImageChange = async (file, fileList) => {
  imageFileList.value = fileList

  const base64List = await Promise.all(
    fileList.map(f => toBase64(f.raw || f))
  )

  props.modelValue.images = base64List
}

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handleImageRemove = (file, fileList) => {
  const url = file.url
  props.modelValue.images = props.modelValue.images.filter(img => img !== url)
  imageFileList.value = fileList
}
</script>
