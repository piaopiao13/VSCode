<script setup>
import { ref } from 'vue'
import {
  articleAddChannelService,
  articleEditChannelService,
} from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,10}$/,
      message: '1-10个字符，支持中文、英文、数字和下划线',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]{1,10}$/,
      message: '1-10个字符，支持英文、数字和下划线',
      trigger: 'blur',
    },
  ],
}

const emit = defineEmits(['refresh'])
const onSubmit = async () => {
  await formRef.value.validate()
  const { id } = formModel.value
  if (id) {
    // 编辑操作
    await articleEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    // 添加操作
    await articleAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  // 触发父组件的方法，刷新频道列表
  emit('refresh')
}

// 暴露一个方法给父组件调用，基于传来的参数，区分是添加还是编辑操作
// 方法open
// 传参为空对象，表示添加操作
// 传参为一个对象，表示编辑操作
const open = (row) => {
  // if (row) {
  //   console.log('编辑操作', row)
  // } else {
  //   console.log('添加操作')
  // }
  formModel.value = { ...row } // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  dialogVisible.value = true
}
defineExpose({
  open,
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item
        label="分类名称"
        prop="cate_name"
      >
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="分类别名"
        prop="cate_alias"
      >
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
