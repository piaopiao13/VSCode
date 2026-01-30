<template>
  <div>
    <MyDialog>
      <!-- 需要通过template标签包裹需要分发的结构，包成一个整体 -->
      <template v-slot:head>
        <div>我是大标题</div>
      </template>
      
      <!-- <template v-slot:content>
        <div>我是内容</div>
      </template> -->

      <template #footer>
        <button>取消</button>
        <button>确认</button>
      </template>
    </MyDialog>

    <hr>

    <MyTable :list="list1">
      <!-- 3. 通过template #插槽名="变量名" 接收所有属性 -->
      <template #default="obj">
        <button @click="del(obj.data.id)">删除</button>
      </template>
    </MyTable>
    <MyTable :list="list2">
      <!-- 解构赋值 -->
      <template #default="{data}">
        <button @click="show(data.id)">查看</button>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyDialog from './components/MyDialog.vue'
import MyTable from './components/MyTable.vue'
export default {
  data () {
    return {
      list1: [
        { id: 1, name: '小张', age: 8 },
        { id: 2, name: '小李', age: 9 },
        { id: 3, name: '小王', age: 7 }
      ],
      list2: [
        { id: 1, name: '小红', age: 6 },
        { id: 2, name: '小绿', age: 8 },
        { id: 3, name: '小蓝', age: 8 }
      ]
    }
  },
  methods: {
    del (id) {
      console.log('删除', id);
      this.list1 = this.list1.filter(item => item.id !== id)
    },
    show(id) {
      console.log('查看', id);
    }
  },
  components: {
    MyDialog,
    MyTable
  }
}
</script>

<style>
body {
  background-color: #b3b3b3;
}
</style>