if (typeof window === 'object') {
   navigator.serviceWorker.register('/sw.js')
   throw new Error('INIT')
}

const buildFiles = ["/20160715-timing-controls-1---debounce","/20160716-timing-controls-2---throttle","/20161008-flowtype--modern-js/demo.png","/20161008-flowtype--modern-js/index","/20161023-rename-a-function","/20170302-ssh-into-private-machines/1.jpg","/20170302-ssh-into-private-machines/2.jpg","/20170302-ssh-into-private-machines/3.jpg","/20170302-ssh-into-private-machines/index","/20170327-animating-dots--dashes","/20170525-react-router-modals-the-way-twitter--pinterest-do-it","/20170622-obfuscation-with-protext/demo/font.ttf","/20170622-obfuscation-with-protext/demo/index","/20170622-obfuscation-with-protext/demo/index.js","/20170622-obfuscation-with-protext/demo/package.json","/20170622-obfuscation-with-protext/git confirm.png","/20170622-obfuscation-with-protext/index","/20170622-obfuscation-with-protext/protext off.png","/20170622-obfuscation-with-protext/protext on.png","/20170730-correct-blur-with-de-gamma/demo/blur.js","/20170730-correct-blur-with-de-gamma/demo/grid.png","/20170730-correct-blur-with-de-gamma/demo/index","/20170730-correct-blur-with-de-gamma/demo/test.jpg","/20170730-correct-blur-with-de-gamma/images/blur-correct.png","/20170730-correct-blur-with-de-gamma/images/blur-incorrect.png","/20170730-correct-blur-with-de-gamma/images/blur.png","/20170730-correct-blur-with-de-gamma/images/process.png","/20170730-correct-blur-with-de-gamma/images/rgb.jpg","/20170730-correct-blur-with-de-gamma/index","/20170902-write-a-stream-ripper-with-mediarecorder/index","/20170902-write-a-stream-ripper-with-mediarecorder/media.webm","/20171130-cra-apps-with-ssr","/20171206-prototype-tree","/Inter-Bold.woff2","/Inter-BoldItalic.woff2","/Inter-Italic.woff2","/Inter-Regular.woff2","/Inter.css","/archive","/atom-one-dark.css","/index.css","/index","/index.js"]

self.addEventListener('install', e => {
   e.waitUntil(caches.open('build').then(buildCache => buildCache.addAll(buildFiles)))
})

self.addEventListener('fetch', e => {
   if (!e.request.url.match(/^https?:/)) {
      return
   }

   const file = e.request.url.replace(location.origin, '')

   if (file === '/sw.js') {
      return
   }

   e.respondWith(
      caches.match(e.request).then(cacheResponse => {
         const fetchPromise = fetch(e.request).then(async res => {
            caches.open(buildFiles.includes(file) ? 'build' : 'runtime').then(cache => {
               cache.put(e.request, res.clone())
            })

            return res
         })

         return cacheResponse || fetchPromise
      })
   )
})
