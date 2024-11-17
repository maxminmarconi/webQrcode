# 网页二维码生成器 Chrome扩展

# Hi there 👋, I'm 牛经理!

🌟 **大龄程序员** | 🛠️ **代码老司机** | 🚀 **技术探索者** | 🌱 **持续学习中** 

## 功能介绍
这是一个简单实用的Chrome扩展程序，可以在网页右下角显示当前页面的二维码。主要功能包括：

- 在页面右下角显示一个小图标
- 点击图标展开显示：
  - 当前网站图标
  - 网站标题（超长自动省略）
  - 页面二维码
- 支持拖动功能：
  - 长按图标可拖动到任意位置
  - 快速点击触发展开/收起
  - 拖动时有视觉反馈
  - 自动防止超出屏幕边界
- 点击页面任意位置自动收起
- 鼠标悬停在标题上可查看完整标题

## 交互说明
### 基本操作
- 快速点击：展开/收起二维码面板
- 点击页面其他位置：自动收起面板
- 鼠标悬停标题：显示完整标题文本

### 拖动功能
- 长按图标或面板 0.2 秒：进入拖动模式
- 按住后移动超过 5 像素：立即进入拖动模式
- 拖动时显示抓取光标反馈
- 松开鼠标：停止拖动，位置保持
- 拖动时自动限制在浏览器窗口内

## 安装方法
1. 下载本项目所有文件
2. 打开Chrome浏览器，进入扩展程序页面：
   - 在地址栏输入：chrome://extensions/
   - 或者点击菜单 -> 更多工具 -> 扩展程序
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本项目所在文件夹

## 项目结构
```
webQrcode/
  ├── manifest.json     // 扩展程序配置文件
  ├── content.js        // 主要功能实现
  ├── content.css       // 样式文件
  ├── popup.html        // 弹出窗口
  ├── popup.js         // 弹出窗口脚本
  ├── qrcode.min.js    // 二维码生成库
  ├── favicon.ico      // 扩展图标
  └── README.md        // 说明文档
```

## 文件说明
- `manifest.json`: 扩展程序的配置文件，定义了权限、资源等信息
- `content.js`: 实现了二维码生成和展示的主要功能
- `content.css`: 定义了二维码容器的样式和动画效果
- `popup.html`: 点击扩展图标时显示的弹出窗口
- `popup.js`: 处理弹出窗口的交互
- `qrcode.min.js`: 用于生成二维码的JavaScript库
- `favicon.ico`: 扩展程序的图标

## 使用方法
1. 安装扩展后，会在Chrome浏览器工具栏显示一个图标
2. 访问任意网页，右下角会显示一个小图标
3. 点击小图标展开显示二维码
4. 可以使用手机扫描二维码访问当前页面
5. 点击页面任意位置可收起二维码

## 技术特点
- 使用原生JavaScript开发，无需额外依赖
- 采用异步加载方式处理二维码库
- 支持中英文标题自动省略
- 自适应网站图标
- 平滑的展开/收起动画效果
- 智能的拖拽交互逻辑
- 优化的性能和内存占用

## 注意事项
- 需要Chrome浏览器版本 88 或更高
- 必须开启开发者模式才能加载
- 部分网站可能因安全策略限制无法获取图标
- 拖动位置在页面刷新后会重置

## 开发说明
如果你想修改或开发新功能：
1. 修改相关文件
2. 在Chrome扩展管理页面点击"重新加载"
3. 刷新网页测试新功能

## 问题反馈
如果遇到问题或有建议，请提交Issue，谢谢。

## 许可证
MIT License

## 作者
[牛经理]

## 更新日志
### v1.0
- 初始版本发布
- 实现基本的二维码生成功能
- 添加展开/收起动画效果
- 添加拖动定位功能
- 优化交互体验

如果这个仓库对你有帮助，欢迎 star，欢迎提问。如果这个仓库帮你解决了工作问题，可以请即将失业的大龄程序员的我喝杯奶茶：

<p align="center"><img src="buy-me-a-coffee-wechat.jpg" width="240" height="240
" alt="" /></p>