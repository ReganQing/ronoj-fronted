<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo-tree.png" alt="" />
          Ron OJ
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="#"> by Ron </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserLayout",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#userLayout {
}

#userLayout .header img {
  height: 64px;
  width: 64px;
}

#userLayout .content {
  padding: 20px;
  background: url("@/assets/斩赤红之瞳.png") no-repeat center/100%;
}

#userLayout .footer {
  background: #2c3e50;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
