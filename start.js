const { spawn, spawnSync } = require('child_process')
const ParcelBundler = require('parcel-bundler')

let firstBuild = true

const bundler = new ParcelBundler('./src/index.tsx', {
   target: 'node',
   cache: false,
})

bundler.on('buildStart', () => {
   console.log('\033c') // clear screen
})

bundler.on('bundled', () => {
   spawnSync('npm', ['run', 'bundle'], {
      stdio: 'inherit',
   })

   if (firstBuild) {
      spawn('npm', ['run', 'server'], {
         stdio: 'inherit',
      })

      firstBuild = false
   }
})

bundler.serve()
