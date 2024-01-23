# mini-ali-oss

轻量的阿里云 OSS 库 for browser

精简阿里云 OSS API，去除不常用的接口精简体积，正在不断的补充常用API。

## 特征

- 无第三方依赖，更轻量
- 使用 `TypeScript` 编写

## 用法

### 安装

```shell
yarn add mini-ali-oss
```

### 创建配置实例

```typescript
import { Bin } from 'mini-ali-oss'

// bucket配置
const config = {
    accessKeyId: 'LTAIOKxxxxxxWSue9q',
    accessKeySecret: 'pyTLRH0sGooAxxxxxxxxxxxxxxxxxANqPedamD',
    region: 'oss-cn-shanghai',
    bucket: 'bucket-name'
}

// 创建一个配置实例
const bin = new Bin(config)
```

### 操作 Object

```typescript
import { Service } from 'mini-ali-oss'

// 创建一个Object服务
const service = new Service(bin)

// 删除文件
await service.delete('user/avatar/002.png')

// 删除文件
await service.upload('user/avatar/002.png', Blob | ArrayBuffer)
```
