<template>
  <h2>用户信息</h2>
  <a-space id="userCenter" direction="vertical" fill>
    <a-form :model="userData">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item field="id" label="用户ID" label-col-flex="100px">
            <a-input v-model="userData.id" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="userName" label="用户昵称" label-col-flex="80px">
            <a-input
              v-model="userData.userName"
              placeholder="please enter..."
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item
            field="userProfile"
            label="用户描述"
            label-col-flex="100px"
          >
            <a-input
              v-model="userData.userProfile"
              placeholder="请用一句话介绍自己"
              style="height: 10vh"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item field="userRole" label="用户身份" label-col-flex="100px">
            <a-input v-model="userData.userRole" disabled />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-space>
</template>

<script setup lang="ts">
import { LoginUserVO, UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { onMounted, ref } from "vue";

let userData = ref<LoginUserVO>({
  createTime: "",
  id: 0,
  updateTime: "",
  userAvatar: "",
  userName: "",
  userProfile: "",
  userRole: "",
});
const loadUserData = async () => {
  try {
    const res = await UserControllerService.getLoginUserUsingGet();
    if (res.code === 0) {
      // 假设 data 是一个可能为 undefined 的对象
      const userDataList: LoginUserVO | undefined = res.data;
      // 使用类型断言确保 data 不为 undefined
      if (userDataList) {
        // 直接更新 userData 的属性值
        Object.assign(userData.value, userDataList);
      } else {
        message.error("用户信息加载失败" + res.message);
      }
    } else {
      message.error("用户信息加载失败" + res.message);
    }
  } catch (error) {
    console.error("加载用户信息时出错", error);
    message.error("加载用户信息时出错");
  }
};

// 页面加载时请求用户数据
onMounted(() => {
  loadUserData();
});
</script>

<style>
#userCenter {
  margin: 30px;
}
.arco-form-item-label-col > .arco-form-item-label {
  color: black;
}
</style>
