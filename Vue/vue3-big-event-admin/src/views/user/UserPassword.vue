<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value && value === pwdForm.value.new_pwd) {
          callback(new Error('原密码和新密码不能一样'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value && value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能和原密码一样'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (value && value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入的新密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

const formRef = ref()
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(pwdForm.value)
  ElMessage.success('密码修改成功')
  // 退出登录
  userStore.setToken('')
  userStore.setUser({})
  router.push('/login')
}

const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-form
      ref="formRef"
      :model="pwdForm"
      :rules="rules"
      label-width="100px"
      style="max-width: 400px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
