<template>
  <div id="manageQuestionView" style="color: #2c3e50">
    <h2>管理题目</h2>
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { Question, QuestionControllerService } from "../../../generated";
import { useRouter } from "vue-router";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0); // 总数据数，默认0条

/**
 * 每页10条数据
 */
const searchParams = ref({
  pageSize: 3,
  current: 1,
});

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败。" + res.message);
  }
};

/**
 * 改变当前页
 * @param page {number} 当前页页数
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 监听 searchParams 变量，改变是触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

// 需要展示到页面的数据列表
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitted",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题设置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "创建者id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

/**
 * 删除数据操作
 * @param question
 */
const doDelete = async function (question: Question) {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // todo 更新数据
    await loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};
const router = useRouter();
/**
 * 修改数据操作
 * @param question
 */
const doUpdate = function (question: Question) {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
