import { load } from 'cheerio'
import { readFileSync } from 'fs-extra'
import { highlight } from 'highlight.js'
import marked, { Renderer } from 'marked'
import slugify from '~/slugify'

const Figure = ({ body, caption }: { body: string; caption?: string }) => `
   <figure>
      ${body}
      ${caption ? `<figcaption>${caption}</figcaption>` : ''}
   </figure>
`

const renderer = new Renderer()

marked.setOptions({
   renderer,
   highlight: (code, lang) => highlight(lang || 'plaintext', code).value,
})

renderer.code = (code, language) =>
   Figure({
      body: `<pre class="hljs"><code>${
         highlight(language || 'plaintext', code).value
      }</code></pre>`,
   })

renderer.heading = (text, level, raw) => {
   const tag = `h${level}`
   const id = slugify(raw, true)
   return `
      <${tag} id="${id}" class="post-heading">
         <a href="#${id}">${text}</a>
      </${tag}>
   `
}

renderer.html = html => {
   const $ = load(html)

   const children = $('body')
      .children()
      .toArray()

   return children
      .map(child => {
         if (child.tagName !== 'insert') {
            return $.html(child)
         }

         const attrs = child.attribs

         const { type } = attrs
         delete attrs.type

         switch (type) {
            case 'image': {
               const { title } = attrs
               delete attrs.title

               const caption = title || attrs.alt

               return Figure({
                  body: `<img ${foo(attrs)} />`,
                  caption,
               })
            }

            case 'iframe': {
               const caption = attrs.title
               delete attrs.title

               return Figure({
                  body: `<iframe ${foo(attrs)}></iframe>`,
                  caption,
               })
            }

            case 'video': {
               const caption = attrs.title
               delete attrs.title

               return Figure({
                  body: `<video ${foo(attrs)}></video>`,
                  caption,
               })
            }

            default:
               throw new Error('Unknown insert type')
         }
      })
      .join('\n')
}

export default function markdown(path: string) {
   return marked(readFileSync(path, 'UTF-8'))
}

function foo(attrs: any) {
   const baz = Object.entries(attrs)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ')

   return baz.length > 0 ? ' ' + baz : ''
}
