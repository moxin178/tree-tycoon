# 从砍树开始

一个从零开始的放置经营游戏 H5 原型。

## 安装

```bash
npm install
```

## 运行方式

1. 在 VS Code 中右键 `index.html`，选择 **Open with Live Server**。
2. 在 Chrome 中打开页面进行游戏。

## 测试

```bash
npm test
```

## 2.5D 版本说明

游戏已升级为俯视角 2.5D 自动化经营模拟：
- 使用 Canvas 渲染游戏世界
- 工人全自动砍树、加工、装车出售
- 玩家负责买地、建建筑、雇工人、升级
- 新版存档版本为 v4

### 运行

```bash
npm install
npm start  # 或使用任意静态服务器
```

### 测试

```bash
npm test              # 单元测试
npm run test:e2e      # 端到端测试（需先启动服务器）
```
