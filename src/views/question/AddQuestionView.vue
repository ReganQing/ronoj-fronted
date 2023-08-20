<template>
  <div id="addQuestionView"></div>
  <a-form :model="form">
    <a-form-item field="title" label="题目标题">
      <a-input v-model="form.title" placeholder="请输入题目标题..." />
    </a-form-item>
    <a-form-item field="tags" label="题目标签">
      <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
    </a-form-item>
    <a-form-item field="answer" tooltip="请在此输入答案" label="答案">
      <MdEditor />
    </a-form-item>
    <a-form-item field="content" label="题目内容">
      <MdEditor />
    </a-form-item>
    <a-form-item label="判题设置" :content-flex="false" :merge-props="false">
      <a-space direction="vertical" style="min-width: 320px">
        <a-form-item field="judgeConfig.timeLimit" label="时间限制">
          <a-input-number
            v-model="form.judgeConfig.timeLimit"
            placeholder="请输入时间限制"
            size="large"
            min="0"
            mode="button"
          />
        </a-form-item>
        <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
          <a-input-number
            v-model="form.judgeConfig.memoryLimit"
            placeholder="请输入内存限制"
            size="large"
            min="0"
            mode="button"
          />
        </a-form-item>
        <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
          <a-input-number
            v-model="form.judgeConfig.stackLimit"
            placeholder="请输入堆栈限制"
            size="large"
            min="0"
            mode="button"
          />
        </a-form-item>
      </a-space>
    </a-form-item>
    <a-form-item
      label="测试用例配置"
      :content-flex="false"
      :merge-props="false"
    >
      <a-form-item
        v-for="(judgeCaseItem, index) of form.judgeCase"
        :key="index"
        no-style
      >
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item
            :field="`form.judgeCase[${index}].input`"
            :label="`测试用例-${index}`"
            :key="index"
          >
            <a-input
              v-model="judgeCaseItem.input"
              placeholder="请输入测试输入用例"
            />
          </a-form-item>
          <a-form-item
            :field="`form.judgeCase[${index}].output`"
            :label="`测试用例-${index}`"
            :key="index"
          >
            <a-input
              v-model="judgeCaseItem.output"
              placeholder="请输入测试输出用例"
            />
          </a-form-item>
          <a-button
            @click="handleDelete(index)"
            type="primary"
            shape="round"
            status="danger"
            :style="{ marginLeft: '10px' }"
            style="width: 128px"
            >删除测试用例
          </a-button>
        </a-space>
      </a-form-item>
      <div>
        <a-button
          @click="handleAdd"
          :style="{ marginLeft: '10px' }"
          style="width: 128px; margin-top: 32px"
          type="primary"
          shape="round"
          >新增测试用例</a-button
        >
      </div>
    </a-form-item>
    <a-form-item>
      <a-button
        html-type="submit"
        type="primary"
        shape="round"
        :style="{ marginLeft: '10px' }"
        style="width: 128px"
        >Submit</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { reactive } from "vue";

const form = reactive({
  tags: ["二叉树", "简单"],
  title: "小猪过河",
  answer: "后序遍历",
  content: "二叉树",
  judgeCase: [
    {
      input: "1 2",
      output: "3 4",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
});
/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 删除测试用例
 * @param index {number} 测试用例索引
 */
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped>
#addQuestionView {
}
</style>
