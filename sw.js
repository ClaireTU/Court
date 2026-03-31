const CACHE = 'peoples-gavel-v9';
const URLS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

// 安裝時快取所有資源，並立即啟用
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting())
  );
});

// 啟用時刪除所有舊版快取
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks =>
      Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first 策略：優先從網路抓最新版，失敗才用快取
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        // 成功從網路取得 → 更新快取
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return resp;
      })
      .catch(() => caches.match(e.request)) // 離線時用快取
  );
});
