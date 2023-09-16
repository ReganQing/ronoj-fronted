<template>
  <div id="userLogin">
    <h2>用户登录</h2>
    <a-form
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
      class="loginForm"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入账号"
          autofocus
        />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          shape="round"
          href="/user/register"
          :style="{ textDecorationLine: 'none', height: '40px' }"
        >
          账号注册
        </a-button>
        <a-button
          html-type="submit"
          type="primary"
          class="button"
          shape="round"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
/**
 * 提交表单
 * @param data
 */
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
</script>

<style scoped>
#userLogin {
  position: relative;
}

#userLogin .loginForm {
  max-width: 480px;
  display: flex;
  justify-content: center;
  margin: 50px auto;
  font-weight: bold;
}

#userLogin .loginForm .button {
  margin-left: auto;
  height: 40px;
  width: 80px;
}
</style>
