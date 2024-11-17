console.log('QR Code Extension: Content script loaded');

function createQRCode() {
  console.log('QR Code Extension: Creating QR code');
  
  // 创建容器
  const container = document.createElement('div');
  container.className = 'qr-container collapsed';
  
  // 设置初始位置
  container.style.right = '20px';
  container.style.bottom = '20px';

  // 拖动相关变量
  let isDragging = false;
  let startX, startY;
  let startRight, startBottom;
  let longPressTimer;
  let isLongPress = false;

  // 处理鼠标按下
  container.addEventListener('mousedown', (e) => {
    if (e.target === container || e.target.classList.contains('toggle-icon')) {
      startX = e.clientX;
      startY = e.clientY;
      
      // 获取初始位置
      const rect = container.getBoundingClientRect();
      startRight = window.innerWidth - rect.right;
      startBottom = window.innerHeight - rect.bottom;

      // 设置长按定时器
      longPressTimer = setTimeout(() => {
        isLongPress = true;
        isDragging = true;
        container.style.transition = 'none';
        container.style.cursor = 'grabbing';
      }, 200);
    }
  });

  // 处理鼠标移动
  const handleMouseMove = (e) => {
    if (!isDragging) {
      // 检查是否移动超过阈值
      if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
        clearTimeout(longPressTimer);
        isDragging = true;
        isLongPress = true;
        container.style.transition = 'none';
        container.style.cursor = 'grabbing';
      }
      return;
    }

    e.preventDefault();
    
    // 计算新位置
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    const newRight = Math.max(0, startRight - deltaX);
    const newBottom = Math.max(0, startBottom - deltaY);
    
    // 确保不超出屏幕边界
    const rect = container.getBoundingClientRect();
    const maxRight = window.innerWidth - rect.width;
    const maxBottom = window.innerHeight - rect.height;
    
    container.style.right = `${Math.min(newRight, maxRight)}px`;
    container.style.bottom = `${Math.min(newBottom, maxBottom)}px`;
  };

  // 处理鼠标松开
  const handleMouseUp = () => {
    clearTimeout(longPressTimer);
    const wasDragging = isDragging;
    isDragging = false;
    
    // 移除事件监听器
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    // 重置状态
    setTimeout(() => {
      container.style.cursor = 'move';
      container.style.transition = 'all 0.3s ease';
      isLongPress = false;
    }, 0);

    // 如果没有拖动，则触发点击事件
    if (!wasDragging && !isLongPress) {
      container.classList.toggle('collapsed');
    }
  };

  // 添加鼠标按下时的事件监听器
  container.addEventListener('mousedown', (e) => {
    if (e.target === container || e.target.classList.contains('toggle-icon')) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  });

  // 防止文本选择
  container.addEventListener('selectstart', (e) => {
    e.preventDefault();
  });

  // 处理点击页面其他位置折叠
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target) && !container.classList.contains('collapsed')) {
      container.classList.add('collapsed');
    }
  });

  // 创建切换图标
  const toggleIcon = document.createElement('img');
  toggleIcon.className = 'toggle-icon';
  toggleIcon.src = getFavicon();
  container.appendChild(toggleIcon);

  // 创建网站信息区域
  const siteInfo = document.createElement('div');
  siteInfo.className = 'site-info';

  // 添加网站图标
  const icon = document.createElement('img');
  icon.className = 'site-icon';
  icon.src = getFavicon();

  // 添加网站名称（限制长度）
  const name = document.createElement('span');
  name.className = 'site-name';
  const title = document.title;
  
  // 计算字符串实际显示长度（中文算2个字符）
  const getStringLength = (str) => {
    let len = 0;
    for(let i = 0; i < str.length; i++) {
      len += str.charCodeAt(i) > 127 ? 2 : 1;
    }
    return len;
  };
  
  // 截取指定显示长度的字符串
  const truncateString = (str, maxLength) => {
    let len = 0;
    let index = 0;
    for(let i = 0; i < str.length; i++) {
      len += str.charCodeAt(i) > 127 ? 2 : 1;
      if(len > maxLength) {
        index = i;
        break;
      }
    }
    return index > 0 ? str.substring(0, index) + '...' : str;
  };

  name.textContent = getStringLength(title) > 24 ? truncateString(title, 24) : title;
  name.title = title; // 添加完整标题作为悬停提示

  siteInfo.appendChild(icon);
  siteInfo.appendChild(name);

  // 创建二维码容器
  const qrcodeDiv = document.createElement('div');
  qrcodeDiv.id = 'qrcode';

  // 组装所有元素
  container.appendChild(siteInfo);
  container.appendChild(qrcodeDiv);
  document.body.appendChild(container);

  // 使用QRCode库生成二维码
  new QRCode(qrcodeDiv, {
    text: window.location.href,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  console.log('QR Code Extension: QR code container added to page');
}

function getFavicon() {
  // 尝试获取网站图标
  let favicon = undefined;
  const links = document.getElementsByTagName('link');
  for(let i = 0; i < links.length; i++) {
    if(links[i].rel.includes('icon')) {
      favicon = links[i].href;
      break;
    }
  }
  // 如果没有找到图标，使用默认图标
  return favicon || '/favicon.ico';
}

// 确保DOM完全加载后再创建二维码
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createQRCode);
} else {
  createQRCode();
}

console.log('QR Code Extension: Script initialization completed');