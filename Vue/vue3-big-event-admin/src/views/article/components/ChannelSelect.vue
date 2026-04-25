<script setup>
import { ref } from 'vue'
import { articleGetChannelsService } from '@/api/article'

defineProps({
  width: {
    type: String,
  },
})

// defineProps({
//   modelValue: {
//     type: [String, Number],
//   },
// })
// const emit = defineEmits(['update:modelValue'])
const modelValue = defineModel()

const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <!-- <el-select
    style="width: 200px"
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  > -->
  <el-select :style="{ width }" v-model="modelValue">
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
