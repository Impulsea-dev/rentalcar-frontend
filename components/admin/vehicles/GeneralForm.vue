<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-h-[80vh] overflow-auto">
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
    <el-form-item label="Vehicle Images" label-position="top">
      <el-upload class="upload-demo" drag multiple action="" :auto-upload="false" :on-change="handleImageChange"
        :on-remove="handleImageRemove" :file-list="imageFileList" accept="image/*" list-type="picture-card">
        <i class="el-icon-upload" />
        <div class="el-upload__text">Drop files here or <em>click to upload</em></div>
      </el-upload>
    </el-form-item>
    <!-- Upload Thumbnail -->
    <el-form-item label="Thumbnail Image" label-position="top">
      <el-upload action="" :auto-upload="false" :limit="1" :file-list="thumbnailFileList"
        :on-change="handleThumbnailChange" :on-remove="handleThumbnailRemove" accept="image/*" list-type="picture-card">
        <i class="el-icon-upload" />
        <div class="el-upload__text">Upload Thumbnail</div>
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
const thumbnailFileList = ref([])


onMounted(() => {
  if (props.modelValue.images?.length) {
    imageFileList.value = props.modelValue.images.map((img, index) => ({
      name: `image-${index + 1}.jpg`,
      url: img,
      status: 'finished'
    }))
  }
 if (props.modelValue.thumbnail) {
  thumbnailFileList.value = [{
    name: 'thumbnail.jpg',
    url: props.modelValue.thumbnail,
    status: 'finished'
  }]
}
})


const handleImageChange = async (file, fileList) => {
  imageFileList.value = fileList
  const imageObjects = await Promise.all(
    fileList.map(async (f) => {
      const image = f.raw ? await toBase64(f.raw) : f.url
      const filename = f.raw?.name || f.name || 'image.png'
      return { image, filename }
    })
  )

  props.modelValue.images = imageObjects
}



const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const handleImageRemove = async (file, fileList) => {
  let base64ToRemove = file.url

  if (file.raw) {
    base64ToRemove = await toBase64(file.raw)
  }

  props.modelValue.images = props.modelValue.images.filter(img => img !== base64ToRemove)
  imageFileList.value = fileList
}


// Thumbnail
const handleThumbnailChange = async (file) => {
  const base64 = await toBase64(file.raw)
  props.modelValue.thumbnail = {
    image: base64,
    filename: file.name || 'thumbnail.jpg'
  }
  thumbnailFileList.value = [{
    name: file.name || 'thumbnail.jpg',
    url: base64,
    status: 'finished'
  }]
}

const handleThumbnailRemove = () => {
  props.modelValue.thumbnail = null
  thumbnailFileList.value = []
}


</script>
