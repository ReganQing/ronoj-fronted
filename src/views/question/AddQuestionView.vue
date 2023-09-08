<template>
  <div id="addQuestionView" style="color: #2c3e50">
    <h2 style="margin-left: 10vw">创建题目</h2>
    <a-form :model="form">
      <a-form-item field="title" label="题目标题" required>
        <a-input v-model="form.title" placeholder="请输入题目标题..." />
      </a-form-item>
      <a-form-item field="tags" label="题目标签" required>
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>
      <a-form-item
        field="answer"
        tooltip="请在此输入答案"
        label="答案"
        required
      >
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item field="content" label="题目内容" required>
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item
        label="判题设置"
        :content-flex="false"
        :merge-props="false"
        required
      >
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
        required
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
          label-align:
          left
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <a-button
              @click="handleDelete(index)"
              type="outline"
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
            type="outline"
            shape="round"
            status="success"
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
          @click="doSubmit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
// 如果页面地址包含update，视为更新页面
const updatePage = route.path.includes("update");
/**
 * 根据题目id获取老的数据
 */
let form = ref({
  title: "",
  tags: [],
  content: "",
  answer: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

const loadData = async () => {
  const id = route.query.id as any;
  if (!id) {
    return;
  } else {
    const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
    if (res.code === 0) {
      form.value = res.data as any; // todo 优化form数据的加载方式
      if (!form.value.judgeCase) {
        form.value.judgeCase = [
          {
            input: "",
            output: "",
          },
        ];
      } else {
        form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
      }
      // json转js对象
      if (!form.value.judgeConfig) {
        form.value.judgeConfig = {
          memoryLimit: 1000,
          stackLimit: 1000,
          timeLimit: 1000,
        };
      } else {
        form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
      }
      if (!form.value.tags) {
        form.value.tags = [];
      } else {
        form.value.tags = JSON.parse(form.value.tags as any);
      }
    } else {
      message.error("修改失败" + res.message);
    }
  }
};

onMounted(() => {
  loadData();
});

/**
 * 提交表单
 */
const doSubmit = async function () {
  console.log(form);
  // 区分更新还是创建
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败" + res.message);
    }
  }
};
/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 删除测试用例
 * @param index {number} 测试用例索引
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

/**
 * 输出答案内容
 * @param value {string} 答案内容
 */
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

/**
 * 输出题目内容
 * @param value {string} 题目内容
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
</script>

<style scoped>
#addQuestionView {
}
</style>
