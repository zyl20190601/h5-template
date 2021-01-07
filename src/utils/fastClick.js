import FastClick from 'fastclick';
import { isiOS } from '@/utils/tools';
FastClick.attach(document.body);
// 解决FastClick导致的点击困难问题
FastClick.prototype.focus = function(targetElement) {
  var length;
  var u = navigator.userAgent;
  var deviceIsIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

document.body.addEventListener('focusout', () => {
  // 软键盘收起的事件处理
  if (isiOS) {
    globalScrollToEvent();
  }
});
// IOS系统下微信平台收起键盘后控制网页复原位置的事件
function globalScrollToEvent() {
  setTimeout(() => {
    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
}
