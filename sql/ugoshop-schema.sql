-- =====================================================================
-- src-one 数据库结构补全：ugoshop 库四表 DDL + 纪念种子数据
-- 补全日期：2026-10-29（memorial 分支）
--
-- 重要说明：
-- 1. 本仓库当年（2018）未提交任何建表脚本，MySQL 结构只存在于当年
--    内网机器（10.3.141.62）上。本文件为 2026 年依据 src/router/*.js
--    中的 SQL 语句与 lay/html/index.html 的字段引用【反推补全】，
--    仅用于纪念运行，不是 2018 年的原始产物。
-- 2. 反推依据逐条标注于各字段 COMMENT；类型无法确证处已如实标注。
-- 3. 本文件同时是 2026 admin 重写（ugoshop_reset · rebuild 分支）的
--    血缘蓝本，映射关系见 doc/联动方案.md 第三节。
--
-- 使用方式（纪念运行）：
--   mysql -u root -p < sql/ugoshop-schema.sql
--   然后修改 src/router/sql.js 的连接信息（内含 2018 年内网地址）
--
-- MySQL 8 注意：老 mysql 驱动不支持 caching_sha2_password，
-- 建登录账号请使用 mysql_native_password：
--   CREATE USER 'ugoshop'@'localhost' IDENTIFIED WITH mysql_native_password BY '...';
--   GRANT ALL ON ugoshop.* TO 'ugoshop'@'localhost';
-- =====================================================================

CREATE DATABASE IF NOT EXISTS ugoshop DEFAULT CHARACTER SET utf8mb4;
USE ugoshop;

-- ---------------------------------------------------------------------
-- f_user：用户表（当年前台注册用户与后台登录共用同一张表）
-- 反推依据：
--   router/login.js  SELECT * FROM f_user WHERE fname=? AND fpws=? AND status=1
--   router/user.js   INSERT INTO f_user (fname,fpws,STATUS) / UPDATE ... WHERE fid=?
--   router/goods.js  DELETE FROM f_user WHERE fid=?
--   router/car.js    SELECT car.fid, f_user.fname FROM car, f_user WHERE car.fid=f_user.fid
-- ---------------------------------------------------------------------
CREATE TABLE f_user (
  fid    INT          NOT NULL AUTO_INCREMENT COMMENT '用户 ID（rebuild users.id 沿用）',
  fname  VARCHAR(32)  NOT NULL                COMMENT '用户名（登录页 #username）',
  fpws   VARCHAR(64)  NOT NULL                COMMENT '密码——当年明文存储（缺陷清单#1），纪念运行如实保留该语义',
  status TINYINT      NOT NULL DEFAULT 1      COMMENT '用户状态：login.js 仅 status=1 可登录；user.js 列表仅显示 status=1',
  PRIMARY KEY (fid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表（前后台共用，2026 admin 以 users.role 列延续该语义）';

-- ---------------------------------------------------------------------
-- ulist：商品表
-- 反推依据：
--   router/goods.js  SELECT * FROM ulist ORDER BY SID LIMIT ?,?
--                    INSERT INTO ulist (STAG,SNAME,SCON,PRICE,DIAN,URL,REPE)
--                    UPDATE ulist SET STAG=?,SNAME=?,SCON=?,PRICE=?,DIAN=?,REPE=? WHERE SID=?
--                    UPDATE ulist SET DIAN = 1|2 WHERE SID = ?   （updown 上下架）
--                    DELETE FROM ulist WHERE SID=?
-- 类型说明：INSERT 中除 REPE 外均以字符串插入；PRICE 类型不可确证，
--   按 DECIMAL(10,2) 兜底；DIAN 取值实测为 1（上架）/ 2（下架）。
-- ---------------------------------------------------------------------
CREATE TABLE ulist (
  SID   INT           NOT NULL AUTO_INCREMENT COMMENT '商品 ID（前后台主键；rebuild products.sid 沿用）',
  STAG  VARCHAR(64)   NOT NULL                COMMENT '商品标签/品牌（rebuild 映射为 products.brand）',
  SNAME VARCHAR(128)  NOT NULL                COMMENT '商品名称（rebuild products.name）',
  SCON  TEXT                                  COMMENT '商品描述/详情（rebuild products.description）',
  PRICE DECIMAL(10,2) NOT NULL DEFAULT 0      COMMENT '商品价格（当年以字符串写入，类型不可确证，取 DECIMAL 兜底；rebuild 为整数 price）',
  DIAN  TINYINT       NOT NULL DEFAULT 1      COMMENT '上下架：updown 接口实测 1=上架 / 2=下架（rebuild 归一化为 products.status 1/0）',
  URL   VARCHAR(255)  DEFAULT NULL            COMMENT '商品图路径（当年与 uploads/ 上传文件断链，缺陷清单#4；rebuild 换代为 legacyUrl + image 双字段）',
  REPE  INT           NOT NULL DEFAULT 0      COMMENT '数值字段，语义不可考（疑为库存）；rebuild 按 stock 库存使用',
  PRIMARY KEY (SID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表（rebuild products 的血缘源头）';

-- ---------------------------------------------------------------------
-- classify：商品分类表（扁平一级）
-- 反推依据：
--   router/goods.js  SELECT * FROM classify LIMIT ?,?
--                    INSERT INTO classify (qname)
--                    UPDATE classify SET qname=? WHERE qid=?
--                    DELETE FROM classify WHERE qid=?
-- 说明：rebuild 已演进为 categories + category_items 两级结构。
-- ---------------------------------------------------------------------
CREATE TABLE classify (
  qid   INT         NOT NULL AUTO_INCREMENT COMMENT '分类 ID',
  qname VARCHAR(64) NOT NULL                COMMENT '分类名称',
  PRIMARY KEY (qid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品分类（一级；rebuild categories 血缘源头）';

-- ---------------------------------------------------------------------
-- car：购物车表（当年身兼订单，历史语义如实保留）
-- 反推依据：
--   router/car.js    SELECT * FROM car / SELECT car.fid, f_user.fname FROM car, f_user WHERE car.fid=f_user.fid
--   lay/html/index.html 订单表格列：{{v['sid']}} {{v['fid']}} {{v['sum']}} {{v['cid']}}
--     （列头：商品ID / 用户ID / 商品数量 / 订单ID）
-- 映射：fid→rebuild cart.user_id、sid→cart.sid、sum→cart.quantity、cid→cart.id
-- ---------------------------------------------------------------------
CREATE TABLE car (
  cid INT NOT NULL AUTO_INCREMENT COMMENT '订单 ID（当年即购物车记录 ID）',
  fid INT NOT NULL                COMMENT '用户 ID（关联 f_user.fid）',
  sid INT NOT NULL                COMMENT '商品 ID（关联 ulist.SID）',
  sum INT NOT NULL DEFAULT 1      COMMENT '商品数量',
  PRIMARY KEY (cid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车（即订单，2018 原始语义；rebuild cart 表血缘源头）';

-- =====================================================================
-- 纪念种子数据（演示用途，可随意增删）
-- =====================================================================

-- 管理员账号：admin / 123456（明文为当年原语义，见上 f_user.fpws 注释）
INSERT INTO f_user (fname, fpws, status) VALUES ('admin', '123456', 1);

-- 示例分类（参考 rebuild 前台品类，可自行修改）
INSERT INTO classify (qname) VALUES ('食品'), ('家电'), ('美妆'), ('珠宝');

-- 示例商品 1 条：URL 用当年 uploads/ 里真实上传的图片文件，
-- 可同时验证"上传落盘 + 后台添加商品"链路
INSERT INTO ulist (STAG, SNAME, SCON, PRICE, DIAN, URL, REPE) VALUES
  ('食品', '示例商品（纪念数据）', '2018 年后台的演示商品数据，请登录后台修改或删除', 99.00, 1, 'uploads/imgupload-1545285652574.jpg', 10);

-- 示例订单 1 条：admin（fid=1）购买 sid=1 商品
INSERT INTO car (fid, sid, sum) VALUES (1, 1, 2);
