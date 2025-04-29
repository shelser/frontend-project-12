import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // 1. Сначала указываем игнорируемые пути (ОТДЕЛЬНЫЙ объект)
  {
    ignores: [
      "dist/**",      // Игнорируем всю папку dist
      "**/dist/**",   // Дублируем для подстраховки
      "**/node_modules/**"
    ]
  },

  // 2. Базовые настройки ESLint
  js.configs.recommended,
  
  // 3. Настройки React
  {
    files: ["**/*.{js,jsx,ts,tsx}"],  // Добавил поддержку TypeScript
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@stylistic': stylistic,
      'import': importPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    rules: {
      // React правила
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      
      // Стилистические правила
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      
      // Импорты
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      
      // Общие правила
      'no-console': 'warn',
      'no-unused-vars': 'warn'
    }
  }
];