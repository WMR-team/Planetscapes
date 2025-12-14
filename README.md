# 数据集展示网站

这是一个用于展示计算机视觉数据集的网站，包含数据集概览、样本展示、统计信息和下载功能。

## 功能特点

- 🎨 全屏轮播背景展示
- 📊 数据集详细统计
- 🖼️ 样本图片浏览
- 📱 响应式设计
- ⚡ 平滑动画效果

## 在线预览

访问: https://你的用户名.github.io/catWeb

## 本地运行

1. 克隆仓库
```bash
git clone https://github.com/你的用户名/catWeb.git
cd catWeb
```

2. 使用任意HTTP服务器运行
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js
npx serve
```

3. 在浏览器访问 `http://localhost:8000`

## 自定义配置

### 修改轮播图片和文字

编辑 `script.js` 文件中的 `heroCarouselData` 数组：

```javascript
const heroCarouselData = [
    {
        image: 'images/sample1.jpg',
        title: '你的标题',
        subtitle: '你的副标题'
    },
    // 添加更多...
];
```

### 修改数据集信息

编辑各个HTML文件中的文字内容和统计数据。

## 文件结构

```
catWeb/
├── index.html          # 主页
├── overview.html       # 概览页面
├── examples.html        # 样本展示页面
├── download.html       # 下载页面
├── styles.css          # 样式文件
├── script.js           # JavaScript脚本
└── images/            # 图片目录
    ├── sample1.jpg
    ├── sample2.jpg
    └── ...
```

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 无需构建工具

## 许可证

MIT License
