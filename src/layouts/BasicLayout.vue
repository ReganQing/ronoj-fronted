<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">
      <a href="#" style="text-decoration-line: none; color: #fff"
        >Copyright © 2023 by Ron
      </a>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.title-bar img {
  height: 48px;
}

.title {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 10px;
}

.content {
  padding: 20px;
  background: #fff;
}

.footer {
  background: #2c3e50;
  padding: 16px;
  bottom: 0;
  text-align: center;
}
</style>
