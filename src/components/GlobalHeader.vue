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
                  <div class="title">Tree OJ</div>
                </div>
              </a-menu-item>

              <a-menu-item v-for="item in visibleRoutes" :key="item.path">
                {{ item.name }}
              </a-menu-item>
            </a-menu>
          </a-layout-header>
        </div>
      </a-col>
      <a-col flex="100px" class="userCenter">
        <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
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
