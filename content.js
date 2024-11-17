console.log('QR Code Extension: Content script loaded');

function createQRCode() {
  console.log('QR Code Extension: Creating QR code');
  
  // 创建容器
  const container = document.createElement('div');
  container.className = 'qr-container collapsed';

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

  // 添加点击事件处理
  container.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    container.classList.toggle('collapsed');
  });

  // 添加点击页面其他位置折叠的处理
  document.addEventListener('click', () => {
    if (!container.classList.contains('collapsed')) {
      container.classList.add('collapsed');
    }
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