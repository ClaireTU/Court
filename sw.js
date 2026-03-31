const CACHE_NAME = 'gavel-cache-v3';

// 這些是需要被存到手機裡離線使用的檔案
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.svg',
  './icons/icon-192.png'
];

// 1. 安裝階段：下載檔案，並且「霸王硬上弓」強制安裝
self.addEventListener('install', event => {
  // 🔥 魔法指令 1：跳過等待狀態，強制立刻安裝新版！
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. 啟動階段：清除舊垃圾，接管畫面
self.addEventListener('activate', event => {
  // 🔥 魔法指令 2：立刻取得所有開啟中畫面的控制權！
  event.waitUntil(self.clients.claim());
  
  // 🔥 魔法指令 3：無情刪除所有舊版本的快取檔案
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('刪除舊快取:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. 攔截網路請求 (Network First 策略：優先抓最新檔案，沒網路才用快取)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});;
