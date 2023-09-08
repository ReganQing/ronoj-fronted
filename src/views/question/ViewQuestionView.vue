<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question">
            <template #title> 问题 </template>
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  <a-tag>{{ question.judgeConfig.timeLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  <a-tag>{{ question.judgeConfig.memoryLimit }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  <a-tag>{{ question.judgeConfig.stackLimit }}</a-tag>
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}</a-tag
                  >
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment">
            <template #title> 评论 </template>
            <a-card>
              <a-comment
                author="有两座山"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                content="好题，做出来了"
                datetime="1 hour"
              >
                <template #actions>
                  <span class="action"> <IconMessage /> 回复 </span>
                </template>
                <a-comment
                  author="兔子吃些胡萝卜"
                  avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
                  content="兄台思路能否讲下"
                  datetime="1 hour"
                >
                  <template #actions>
                    <span class="action"> <IconMessage /> 回复 </span>
                  </template>
                  <a-comment
                    author="有两座山"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
                    content="使用双指针兄弟"
                    datetime="1 hour"
                  >
                    <template #actions>
                      <span class="action"> <IconMessage /> 回复 </span>
                    </template>
                  </a-comment>
                  <a-comment
                    author="兔子吃些胡萝卜"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    content="好的，我试试，感谢！"
                    datetime="1 hour"
                  >
                    <template #actions>
                      <span class="action"> <IconMessage /> 回复 </span>
                    </template>
                  </a-comment>
                </a-comment>
              </a-comment>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="answer">
            <template #title> 题解 </template>
            <a-card>
              <a-comment
                author="有两座山"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                content="好题，做出来了"
                datetime="1 hour"
              >
                <template #actions>
                  <span class="action"> <IconMessage /> 回复 </span>
                </template>
                <a-comment
                  author="兔子吃些胡萝卜"
                  avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
                  content="兄台思路能否讲下"
                  datetime="1 hour"
                >
                  <template #actions>
                    <span class="action"> <IconMessage /> 回复 </span>
                  </template>
                  <a-comment
                    author="有两座山"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
                    content="使用双指针兄弟"
                    datetime="1 hour"
                  >
                    <template #actions>
                      <span class="action"> <IconMessage /> 回复 </span>
                    </template>
                  </a-comment>
                  <a-comment
                    author="兔子吃些胡萝卜"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    content="好的，我试试，感谢！"
                    datetime="1 hour"
                  >
                    <template #actions>
                      <span class="action"> <IconMessage /> 回复 </span>
                    </template>
                  </a-comment>
                </a-comment>
              </a-comment>
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="codeForm" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              :style="{ width: '320px' }"
              v-model="codeForm.language"
              placeholder="请选择要使用的编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>python</a-option>
              <a-option>go</a-option>
              <a-option>javascript</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="codeForm.code as string"
          :language="codeForm.language"
          :handle-change="changeCodeValue"
        />
        <a-divider size="0" />
        <a-button type="primary" @click="doSubmit" style="min-width: 150px"
          >提交代码</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import { IconHeart, IconMessage, IconStar } from "@arco-design/web-vue/es/icon";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const question = ref<QuestionVO>();

// 需要展示到页面的数据列表
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createdTime",
  },
  {
    slotName: "optional",
  },
];

// 得到路由中传过来的id参数
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const codeForm = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...codeForm.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
};

/**
 * 加载数据
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败。" + res.message);
  }
};

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 改变编辑器代码
 * @param value
 */
const changeCodeValue = (value: string) => {
  codeForm.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
