<template>
  <div id="globalHeader">
    <a-row style="margin-bottom: 16px" align="center" :wrap="false">
      <a-col flex="auto">
        <div>
          <a-layout-header class="header">
            <a-menu
              mode="horizontal"
              :selected-keys="selectedKeys"
              @menu-item-click="doMenuClick"
            >
              <a-menu-item
                key="0"
                :style="{ padding: 0, marginRight: '38px' }"
                disabled
              >
                <div class="title-bar">
                  <img src="../assets/logo-tree.png" alt="logo" />
                  <div class="title">Ron OJ</div>
                </div>
              </a-menu-item>

              <a-menu-item v-for="item in visibleRoutes" :key="item.path">
                {{ item.name }}
              </a-menu-item>
            </a-menu>
          </a-layout-header>
        </div>
      </a-col>
      <a-col flex="100px" class="userCenter" style="color: #2c3e50">
        <a-dropdown>
          <div style="color: brown">
            <span v-if="!isLoggedIn" @click="navigateToLogin">未登录</span>
            <span v-else>{{ store.state.user?.loginUser?.userName }}</span>
          </div>
          <template #content>
            <a-doption v-if="isLoggedIn" @click="navigateToUserCenter"
              >用户中心</a-doption
            >
            <a-doption v-if="isLoggedIn" @click="logOut">退出</a-doption>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAuthority from "@/authority/checkAuthority";
import AUTHORITY_ENUM from "@/authority/authorityEnum";

const router = useRouter();
// 获取已存储的状态变量
const store = useStore();

// 获取用户登录状态
const isLoggedIn = computed(() => {
  return store.state.user?.loginUser?.loggedIn;
});

// 点击退出登录
const logOut = () => {
  // 调用vuex中的mutation来清除用户登录状态
  store.dispatch("user/getLogOutUser");
  // 重定向到主页
  router.push({ name: "主页" });
};

// 使用路由导航到登录页面
const navigateToLogin = () => {
  router.push({ name: "用户登录" });
};

// 跳转到用户中心
const navigateToUserCenter = () => {
  return router.push({ name: "用户中心" });
};

// 展示在菜单的路由
const visibleRoutes = computed(() => {
  const loginUser = store.state.user.loginUser;
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAuthority(loginUser, item?.meta?.authority as string)) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的路由页面
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 修改状态变量，模拟登录
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "Ron567",
    userRole: AUTHORITY_ENUM.ADMIN,
  });
}, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#globalHeader {
  box-shadow: #eee 1px 1px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title-bar img {
  height: 48px;
}

.title {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 10px;
}
</style>
