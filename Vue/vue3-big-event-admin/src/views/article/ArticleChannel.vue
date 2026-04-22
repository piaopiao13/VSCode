<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import {
  articleGetChannelsService,
  articleDeleteChannelService,
} from '@/api/article'

const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await articleGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
// 组件加载时获取频道列表
getChannelList()

const onDelChannel = async (row) => {
  // console.log('删除频道', row)
  await ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  await articleDeleteChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}

const dialogRef = ref()
const onAddChannel = () => {
  // console.log('添加频道')
  // dialogVisible.value = true
  dialogRef.value.open({})
}
const onEditChannel = (row) => {
  // console.log('编辑频道', row)
  dialogRef.value.open(row)
}
const onRefresh = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button
        type="primary"
        @click="onAddChannel"
        >添加分类</el-button
      >
    </template>

    <!-- 表格 -->
    <el-table
      :data="channelList"
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        label="序号"
        width="100"
        type="index"
      />
      <el-table-column
        prop="cate_name"
        label="分类名称"
      />
      <el-table-column
        prop="cate_alias"
        label="分类别名"
      />
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 添加/编辑频道的弹层 -->
    <channel-edit
      ref="dialogRef"
      @refresh="onRefresh"
    />
  </page-container>
</template>
