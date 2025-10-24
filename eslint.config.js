/**
 * ESLint 配置文件
 * 
 * 本配置文件使用 ESLint 9.x 的扁平配置格式 (Flat Config)
 * 适用于 Vue 3 + TypeScript + Vite 项目
 */

// 导入必要的 ESLint 插件和解析器
import js from '@eslint/js';                                    // ESLint 推荐的 JavaScript 规则
import typescript from '@typescript-eslint/eslint-plugin';      // TypeScript 规则插件
import typescriptParser from '@typescript-eslint/parser';       // TypeScript 解析器
import vue from 'eslint-plugin-vue';                            // Vue 规则插件
import vueParser from 'vue-eslint-parser';                     // Vue 单文件组件解析器

export default [
    // 基础 JavaScript 规则配置
    js.configs.recommended,

    // 主要规则配置 - 适用于所有 JS/TS/Vue 文件
    {
        // 文件匹配模式：所有 JavaScript、TypeScript 和 Vue 文件
        files: ['**/*.{js,ts,vue}'],

        // 语言选项配置
        languageOptions: {
            // 使用 Vue 解析器来处理 Vue 单文件组件
            parser: vueParser,

            // 解析器选项
            parserOptions: {
                parser: typescriptParser,        // 在 Vue 文件中使用 TypeScript 解析器
                ecmaVersion: 'latest',          // 使用最新的 ECMAScript 版本
                sourceType: 'module',           // 使用 ES 模块语法
            },

            // 全局变量定义
            globals: {
                // Node.js 环境变量
                console: 'readonly',            // 控制台对象
                process: 'readonly',            // 进程对象
                Buffer: 'readonly',             // Buffer 对象
                __dirname: 'readonly',          // 当前目录路径
                __filename: 'readonly',          // 当前文件路径
                global: 'readonly',             // 全局对象

                // CommonJS 模块系统变量
                module: 'readonly',             // module 对象
                require: 'readonly',            // require 函数
                exports: 'readonly',            // exports 对象
            },
        },

        // 插件配置
        plugins: {
            '@typescript-eslint': typescript,    // TypeScript 规则插件
            vue: vue,                           // Vue 规则插件
        },

        // 规则配置
        rules: {
            // ========== Vue 3 特定规则 ==========
            'vue/multi-word-component-names': 'off',        // 关闭多词组件名要求（允许单词组件名）
            'vue/no-v-html': 'warn',                        // 警告使用 v-html（安全风险）
            'vue/require-default-prop': 'off',              // 关闭 props 默认值要求
            'vue/require-explicit-emits': 'off',             // 关闭显式 emits 声明要求

            // ========== TypeScript 规则 ==========
            '@typescript-eslint/no-explicit-any': 'warn',                    // 警告使用 any 类型
            '@typescript-eslint/no-unused-vars': 'warn',                    // 警告未使用的变量
            '@typescript-eslint/explicit-function-return-type': 'off',     // 关闭函数返回类型要求
            '@typescript-eslint/explicit-module-boundary-types': 'off',     // 关闭模块边界类型要求

            // ========== 通用 JavaScript 规则 ==========
            'no-console': 'warn',              // 警告使用 console（生产环境应移除）
            'no-debugger': 'warn',             // 警告使用 debugger（生产环境应移除）
            'prefer-const': 'error',           // 强制使用 const 而非 let（如果变量不重新赋值）
            'no-var': 'error',                // 禁止使用 var（推荐使用 let/const）
        },
    },

    // Vue 单文件组件特殊规则配置
    {
        // 仅适用于 Vue 单文件组件
        files: ['**/*.vue'],

        rules: {
            // Vue 组件命名规则
            'vue/component-definition-name-casing': ['error', 'PascalCase'],  // 组件定义名必须使用 PascalCase
            'vue/component-name-in-template-casing': 'off',                   // 关闭模板中组件名格式要求（兼容 Ant Design Vue）
        },
    },

    // 忽略文件配置
    {
        // 忽略以下目录和文件，不进行 ESLint 检查
        ignores: [
            'dist/',           // 构建输出目录
            'node_modules/',   // 依赖包目录
            '*.d.ts',          // TypeScript 声明文件
        ],
    },
];