<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const formRef = ref()
const {
  user: { email, nickname, id, username },
  getUser,
} = useUserStore()
const form = ref({
  id: id,
  username: username,
  nickname: nickname,
  email: email,
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}/,
      message: '昵称长度为2-10位的非空字符',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],
}

const onSubmit = async () => {
  // 检验
  await formRef.value.validate()
  // 提交修改
  await userUpdateInfoService(form.value)
  // 通知user模块更新数据
  await getUser()
  // 提示
  ElMessage.success('更新成功')
}
</script>

<template>
  <page-container title="基本资料">
    <!-- 表单部分 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
