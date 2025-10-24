<template>
  <a-form
    :model="model"
    :layout="layout"
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
    @keyup.enter="onAutoSubmit"
  >
    <a-row :gutter="[16, 16]">
      <!-- Form Items -->
      <template v-for="(item, index) in visibleItems" :key="index">
        <a-col :span="colSpan">
          <component :is="item" />
        </a-col>
      </template>

      <!-- Button Group -->
      <a-col :span="colSpan" class="button-group-col">
        <a-space>
          <a-button v-if="!hideResetBtn" @click="onReset">
            <template #icon v-if="showButtonIcon">
              <ReloadOutlined />
            </template>
            {{ resetText || "重置" }}
          </a-button>
          <a-button v-if="!hideSearchBtn" type="primary" @click="onSubmit">
            <template #icon v-if="showButtonIcon">
              <SearchOutlined />
            </template>
            {{ searchText || "查询" }}
          </a-button>
          <a-button v-if="showToggleBtn" type="link" @click="toggleCollapse">
            <template #icon>
              <UpOutlined v-if="!isCollapsed" />
              <DownOutlined v-else />
            </template>
            {{ isCollapsed ? expandText || "展开" : collapseText || "收起" }}
          </a-button>
          <slot name="extra" />
        </a-space>
      </a-col>
    </a-row>
    <slot v-if="false" />
  </a-form>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, VNode } from "vue";
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  model: { type: Object, required: true },
  layout: { type: String, default: "inline" },
  searchText: { type: String, default: "" },
  resetText: { type: String, default: "" },
  expandText: { type: String, default: "" },
  collapseText: { type: String, default: "" },
  hideSearchBtn: { type: Boolean, default: false },
  hideResetBtn: { type: Boolean, default: false },
  showButtonIcon: { type: Boolean, default: false },
  numCol: { type: Number, default: 4 },
});

const emit = defineEmits(["submit", "reset", "auto-submit"]);
const slots = useSlots();

const isCollapsed = ref(true);

const allItems = computed<VNode[]>(() => {
  if (!slots.default) return [];
  return slots
    .default()
    .filter(
      (node) => typeof node.type === "object" && node.type.name !== "Tooltip"
    );
});

const visibleItems = computed(() => {
  if (!isCollapsed.value) {
    return allItems.value;
  }
  // 当收起时，显示的项目数量为 numCol - 1（为按钮组预留一列）
  return allItems.value.slice(0, Math.max(0, props.numCol - 1));
});

const showToggleBtn = computed(() => allItems.value.length >= props.numCol);

// 计算每列的 span 值，基于 24 栅格系统
const colSpan = computed(() => Math.floor(24 / props.numCol));

const onSubmit = () => emit("submit", { ...props.model });
const onReset = () => emit("reset");
const onAutoSubmit = () => emit("auto-submit", { ...props.model });

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.button-group-col {
  text-align: right;
  white-space: nowrap;
}

:deep(.ant-form-item) {
  margin-bottom: 0;
  width: 100%;
}
</style>
