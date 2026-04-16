import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useChannelStore = defineStore("channel", () => {
  // 声明数据
  const channelList = ref([]);

  // 声明方法
  const getChannelList = async () => {
    const {
      data: { data },
    } = await axios.get("http://geek.itheima.net/v1_0/channels");
    console.log(data);
    channelList.value = data.channels;
  };

  // 声明计算属性

  // 暴露数据和方法
  return {
    channelList,
    getChannelList,
  };
});
