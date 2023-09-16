<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header" style="color: #2c3e50; margin: 0 10px">
        <a-space>
          <img src="../assets/logo-tree.png" alt="" />
          <span @click="navigateToHome">Ron OJ</span>
        </a-space>
      </a-layout-header>
      <a-layout-content
        class="content"
        style="text-align: center; color: #2c3e50"
      >
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="#" style="text-decoration-line: none; color: #fff"
          >Copyright © 2023 by Ron
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const navigateToHome = () => {
  return router.push({ name: "主页" });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserLayout",
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#userLayout {
  color: #000;
}

#userLayout .header img {
  height: 64px;
  width: 64px;
}

#userLayout .content {
  padding: 20px;
  background: url("@/assets/plane.png") no-repeat center/100%;
}
#userLayout .footer {
  background: #2c3e50;
  padding: 16px;
  text-align: center;
}
</style>
