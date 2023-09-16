<template>
  <h2>用户注册</h2>
  <div id="userRegister">
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
          allow-clear
        />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
          id="firstInputPassword"
          :style="{ autocomplete: 'new-password' }"
          :rules="[{ required: true, message: '输入密码' }]"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="密码不少于8位"
        label="确认密码"
        :rules="[
          { required: true, message: '请确认密码' },
          { validator: validatePassCheck, required: true },
        ]"
        :validate-trigger="'input'"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
          allow-clear
        />
        <span id="cue"></span>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          shape="round"
          href="/user/login"
          :style="{ textDecorationLine: 'none', height: '40px' }"
        >
          用户登录
        </a-button>
        <a-button
          html-type="submit"
          type="primary"
          class="button"
          shape="round"
          size="medium"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

/**
 * 表单信息
 */
const form = reactive({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
} as UserRegisterRequest);

/**
 * 提交表单
 * @param data
 */
const router = useRouter();
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 注册成功，跳转到登录页
  if (res.code === 0) {
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败," + res.message);
  }
};

// 表单验证
const validatePassCheck = (value: string, callback: any) => {
  console.log(value, callback);
  if (value === "") {
    callback("密码不能为空");
  } else if (value !== form.checkPassword) {
    callback("两次密码输入不一致");
  } else {
    callback();
  }
};
</script>

<style scoped>
#userRegister {
}

#userRegister .loginForm {
  max-width: 480px;
  display: flex;
  justify-content: center;
  margin: 50px auto;
  font-weight: bold;
  color: black;
}

#userRegister .loginForm .button {
  margin-left: auto;
  height: 40px;
  width: 80px;
}
</style>
