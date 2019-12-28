import { copyFileSync, copySync, ensureDirSync, readFileSync, writeFileSync } from 'fs-extra'
import { dirname } from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { posts, postsAssets } from '~data/posts'
import Post from '~layouts/Post'
import Archive from '~pages/Archive'
import Blog from '~pages/Blog'
import walk from '~walk'

posts.forEach(post => {
   const path = post.url
   const htmlFile = './dist/' + path + (path.endsWith('/') ? 'index.html' : '.html')

   ensureDirSync(dirname(htmlFile))
   writeFileSync(htmlFile, '<!DOCTYPE html>' + renderToStaticMarkup(<Post post={post} />))
})

postsAssets.forEach(asset => {
   const assetFile = `dist/${asset.url}`
   ensureDirSync(dirname(assetFile))
   copyFileSync(asset.path, assetFile)
})

writeFileSync('dist/index.html', '<!DOCTYPE html>' + renderToStaticMarkup(<Blog />))
writeFileSync('dist/archive.html', '<!DOCTYPE html>' + renderToStaticMarkup(<Archive />))

copySync('src/assets', 'dist')

const buildFiles = walk('dist')
   .map(file => file.replace(/^dist/, ''))
   .filter(file => file !== '/sw.js')
   .filter(file => !file.match(/\.(map|gitignore)$/))
   .map(file => {
      if (file === '/index.html') {
         return '/'
      }

      if (file.endsWith('/index.html')) {
         return file.replace(/index\.html$/, '')
      }

      return file.replace(/\.html$/, '')
   })

writeFileSync(
   'dist/sw.js',
   readFileSync('dist/sw.js', 'UTF-8').replace('__BUILD_FILES__', JSON.stringify(buildFiles))
)

console.log('done')
