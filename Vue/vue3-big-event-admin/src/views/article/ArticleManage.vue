<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { articleGetListService, articleDeleteService } from '@/api/article'
import { formatTime } from '@/utils/format'

// 搜索表单数据
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
// 总数
const total = ref(0)
const loading = ref(false)
// 文章列表数据
const articleList = ref([])
const getArticleList = async () => {
  loading.value = true
  const res = await articleGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
const articleEditRef = ref()
// 添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除文章
const onDelArticle = async (row) => {
  // console.log('删除文章', row)
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
  await articleDeleteService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
// 每页条数改变
const onSizeChange = (newSize) => {
  params.value.pagenum = 1
  params.value.pagesize = newSize
  getArticleList()
}
// 页码改变
const onCurrentChange = (newPage) => {
  params.value.pagenum = newPage
  getArticleList()
}

// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const onReset = () => {
  params.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: '',
  }
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    // 渲染最新数据在的地方（最后一页）。
    // 总条数除以每页条数，向上取整就是最后一页的页码
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  // 刷新
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <!-- 搜索框表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" underline="never">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <!-- 利用作用域插槽， row 为当前行数据 -->
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
