<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  articleAddService,
  articleGetDetailService,
  articleEditService,
} from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const visibleDrawer = ref(false)
const defaultArticleModel = {
  title: '',
  content: '',
  cover_img: '',
  state: '草稿',
  cate_id: '',
}
const articleModel = ref({ ...defaultArticleModel })
const imgUrl = ref('')
const onUploadFile = (file) => {
  // console.log('上传文件', file)
  imgUrl.value = URL.createObjectURL(file.raw) // 生成一个临时的URL地址，指向上传的文件
  articleModel.value.cover_img = file.raw
}

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传文章封面', trigger: 'change' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
}

const formRef = ref(null)
const emit = defineEmits(['success'])
const onSubmitArticle = async (state) => {
  await formRef.value.validate()
  articleModel.value.state = state
  // console.log(state)

  // 将articleModel转换为FormData对象
  const formData = new FormData()
  for (let key in articleModel.value) {
    formData.append(key, articleModel.value[key])
  }

  // 如果articleModel.value.id存在，说明是编辑文章，否则是添加文章
  if (articleModel.value.id) {
    // 编辑文章
    await articleEditService(formData)
    ElMessage.success('文章编辑成功')
    emit('success', 'edit') // 触发父组件的success事件，刷新文章列表
  } else {
    // 添加文章
    await articleAddService(formData)
    ElMessage.success('文章发布成功')
    emit('success', 'add') // 触发父组件的success事件，刷新文章列表
  }
  visibleDrawer.value = false
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type'],
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

const editorRef = ref(null)
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // console.log('编辑文章', row)
    const res = await articleGetDetailService(row.id)
    articleModel.value = res.data.data
    // 单独处理图片预览
    imgUrl.value = baseURL + articleModel.value.cover_img
    // 调整数据格式，方便后续提交后台
    articleModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      articleModel.value.cover_img,
    )
  } else {
    // console.log('打开 - 添加文章')
    articleModel.value = { ...defaultArticleModel }
    // 虽然表单数据articleModel.value已经被重置了，图片和编辑器内容还是之前的，所以需要手动重置
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}
defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="articleModel.id ? '编辑文章' : '添加文章'"
    size="50%"
    resizable
  >
    <!-- 发表文章表单 -->
    <el-form
      :model="articleModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="articleModel.title"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="articleModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="articleModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitArticle('已发布')"
          >发布</el-button
        >
        <el-button type="info" @click="onSubmitArticle('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
