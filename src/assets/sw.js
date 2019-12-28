;(() => {
   if (typeof window === 'object') {
      navigator.serviceWorker.register('/sw.js')
      return
   }

   const buildFiles = __BUILD_FILES__

   self.addEventListener('install', e => {
      e.waitUntil(
         caches
            .open('build')
            .then(buildCache => buildCache.addAll(buildFiles))
            .then(self.skipWaiting())
      )
   })

   self.addEventListener('fetch', e => {
      if (!e.request.url.match(/^https?:/)) {
         return
      }

      const file = e.request.url.replace(location.origin, '')

      if (file === '/sw.js') {
         return
      }

      const fetchPromise = fetch(e.request).then(res => {
         caches.open(buildFiles.includes(file) ? 'build' : 'runtime').then(cache => {
            cache.put(e.request, res)
         })

         return res.clone()
      })

      e.respondWith(caches.match(e.request).then(cacheResponse => cacheResponse || fetchPromise))
   })
})()
