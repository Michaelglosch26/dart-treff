// Dart-Treff: holt immer die neueste Version, offline aus dem Zwischenspeicher
const CACHE='dart-treff-v4';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.all(['./','index.html','manifest.json','icon-192.png','icon-512.png','wappen.png','players.json'].map(u=>c.add(u).catch(()=>{}))))));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(CACHE).then(c=>c.put(e.request,k));return r;}).catch(()=>caches.match(e.request)));
});
