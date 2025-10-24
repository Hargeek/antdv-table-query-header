# antdv-table-query-header

[![npm](https://img.shields.io/npm/v/@ssgeek/antdv-table-query-header)](https://www.npmjs.com/package/@ssgeek/antdv-table-query-header)

一个基于 [Ant Design Vue](https://antdv.com) 的通用查询表单组件，快速构建带有查询、重置和展开/收起功能的表单头部

项目是 [a-table-query-header](https://github.com/Hargeek/a-table-query-header) 的复刻版本，基于 Ant Design Vue 的 Grid
系统实现，提供灵活的表单布局和交互功能。

## ✨ 特性

- 支持 `showButtonIcon` 属性，可以设置是否显示默认按钮的图标
- 支持通过父组件传入按钮的文案，这在需要本地化时非常有用
- 支持自定义添加额外的按钮，通过 `#extra` 插槽实现
- 基于 Ant Design Vue 的栅格系统，响应式布局
- 自动收起/展开功能，当表单项超过指定列数时显示展开/收起按钮

## 📦 安装

```bash
npm install @ssgeek/antdv-table-query-header
```

## 🚀 使用

只需将你的 `<a-form-item>` 元素作为子组件传入即可，组件会自动处理布局和交互。

```vue

<template>
  <a-card>
    <antdv-table-query-header
        :model="formModel"
        :num-col="4"
        @submit="handleSearch"
        @reset="handleReset"
    >
      <!-- 在这里放置 a-form-item 元素 -->
      <a-form-item name="name" label="姓名">
        <a-input v-model:value="formModel.name" placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item name="age" label="年龄">
        <a-input-number v-model:value="formModel.age" placeholder="请输入年龄"/>
      </a-form-item>
      <a-form-item name="status" label="状态">
        <a-select v-model:value="formModel.status" placeholder="请选择状态">
          <a-select-option :value="1">在线</a-select-option>
          <a-select-option :value="0">离线</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="address" label="地址">
        <a-input v-model:value="formModel.address" placeholder="请输入地址"/>
      </a-form-item>
      <a-form-item name="date" label="日期">
        <a-date-picker v-model:value="formModel.date"/>
      </a-form-item>

      <!-- 通过 #extra 插槽添加额外按钮 -->
      <template #extra>
        <a-button @click="handleExport">导出</a-button>
      </template>
    </antdv-table-query-header>
  </a-card>
</template>

<script setup>
  import {reactive} from 'vue';
  // 如果没有全局注册，请确保导入组件
  // import AntdvTableQueryHeader from '@ssgeek/antdv-table-query-header';

  const formModel = reactive({
    name: '',
    age: null,
    status: null,
    address: '',
    date: '',
  });

  const handleSearch = (model) => {
    console.log('查询参数:', model);
    // 在此执行查询逻辑
  };

  const handleReset = () => {
    console.log('重置表单');
    // 在此执行重置逻辑
    Object.keys(formModel).forEach(key => {
      formModel[key] = null;
    });
  };

  const handleExport = () => {
    console.log('导出数据...');
  }
</script>
```

## 📚 API

### Props 属性

| 属性名              | 说明          | 类型        | 默认值        |
|------------------|-------------|-----------|------------|
| `model`          | 表单数据对象      | `Object`  | `required` |
| `layout`         | 表单布局        | `String`  | `'inline'` |
| `numCol`         | 每行显示的列数     | `Number`  | `4`        |
| `searchText`     | 查询按钮的文本     | `String`  | `'查询'`     |
| `resetText`      | 重置按钮的文本     | `String`  | `'重置'`     |
| `expandText`     | 展开按钮的文本     | `String`  | `'展开'`     |
| `collapseText`   | 收起按钮的文本     | `String`  | `'收起'`     |
| `hideSearchBtn`  | 是否隐藏查询按钮    | `Boolean` | `false`    |
| `hideResetBtn`   | 是否隐藏重置按钮    | `Boolean` | `false`    |
| `showButtonIcon` | 是否显示默认按钮的图标 | `Boolean` | `false`    |

### Events 事件

| 事件名           | 说明           | 回调参数                       |
|---------------|--------------|----------------------------|
| `submit`      | 点击查询按钮时触发    | `(model: Object)` - 当前表单数据 |
| `reset`       | 点击重置按钮时触发    | -                          |
| `auto-submit` | 在表单内按下回车键时触发 | `(model: Object)` - 当前表单数据 |

### Slots 插槽

| 插槽名       | 说明                          |
|-----------|-----------------------------|
| `default` | 用于放置 `<a-form-item>` 组件的主插槽 |
| `extra`   | 用于在按钮组右侧添加额外按钮或内容           |
