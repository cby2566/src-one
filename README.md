# src-one —— ugoshop 电商后台管理系统（2018）

> 2018.11.21 ~ 12.25 多人协作练手项目。与 ugoshop 前台同源配套，共用同一套 MySQL `ugoshop` 库。
> 本仓库在 2026.10 定案**不复活原代码**，而是作为需求蓝本，在 ugoshop_reset（rebuild 分支）以现代栈重写为 admin 管理端，详见 [doc/联动方案.md](doc/联动方案.md)。

## 技术栈

- 后端：Node.js + Express（无 package.json，当年手动安装 `express body-parser mysql multer` 四个依赖）
- 数据库：MySQL（`f_user` / `ulist` / `classify` / `car` 四表）
- 前端：jQuery 3.2.1 + LayUI 2.4.5 + idcode 图形验证码，局部 Vue2（订单表格渲染）
- 零构建：纯静态页面 + CommonJS 路由，`node server.js` 即跑

## 功能

- 登录（图形验证码 + "记住我" cookie）
- 商品管理：列表（分页）/ 新增 / 编辑 / 删除 / 上下架（DIAN 字段 1/2）/ 图片上传
- 商品分类：一级分类增改删
- 用户管理：列表 / 新增 / 改密
- 订单管理：读取 `car` 表（当年购物车即订单，历史语义如实保留）

## 目录结构

```
12.17w.txt / 12.cxw.txt   当年提交占位残留（空文件，考古原样保留）
src/
├── server.js              Express 入口（端口 2333）
├── config.json            端口 / 静态根 / host
├── router/                路由层：login / user / goods / car / list / sql
├── index.html             登录页
├── lay/html/index.html    LayUI 后台主框架（商品/用户/订单三组菜单）
├── html/center.html       个人中心页
├── assets/                jQuery / LayUI 副本 / idcode 验证码 / 图标
├── js/  css/  sass/       公共 JS / 样式 / SCSS 源
└── uploads/               当年 multer 上传的 6 张真实图片（2018.12 时间戳）
```

## 运行（纪念用途）

1. MySQL 建库：导入 [sql/ugoshop-schema.sql](sql/ugoshop-schema.sql)（仓库当年无建表脚本，此文件为 2026 依据路由代码反推补全，含管理员种子账号）
2. `cd src`
3. 安装依赖（锁版本，2026 年 npm 默认 express@5 与老代码不兼容）：

   ```bash
   npm install express@4 body-parser mysql multer@1.4.5-lts.1
   ```

4. 修改 `router/sql.js` 连接信息（文件内写的是 2018 年内网地址 `10.3.141.62:3306`）
5. `node server.js` → http://localhost:2333

> MySQL 8 注意：老 `mysql` 驱动不支持 `caching_sha2_password`，建账号时需用 `mysql_native_password`。
> 登录账号（种子）：`admin` / `123456`

## 考古发现（当年代码缺陷，详见联动方案）

- 登录 SQL 字符串拼接 + 明文密码比对
- `goods.js` 的 `/insert`、`/update` 参数写成 `(res, req)`，负负得正侥幸可跑
- `user.js` 分页 count 返回当前页条数（分页失真）
- 图片上传只落盘不入库

## 分支

| 分支 | 说明 |
|------|------|
| `master` / `cby` / `cxw` / `cxw2` | 2018.12.25 历史终态（多人协作现场，含冲突解决痕迹），保持原样 |
| `memorial` | 2026 档案分支：README、联动方案、DDL 反推补全；后续实施纪要在此追加 |
