import { load } from 'cheerio'
import { relative } from 'path'
import markdown from '~markdown'
import slugify from '~slugify'
import walk from '~walk'

const not = (x: unknown) => !x

type PostFileData = {
   date: {
      day: number
      year: number
      month: number
   }
   title: string
   url: string
}

function getData(path: string): PostFileData {
   // <year>/<month>/<day>-<title>(/<sub>)?
   const match = relative('./posts', path).match(/(\d+)\/(\d+)\/(\d+)-([^\/]+)(.+)?/)

   if (match === null) {
      throw new Error(
         [
            `Unexpected path found: ${path}`,
            'Post path must match one of following patterns:',
            '  <year>/<month>/<day>-<title>.md',
            '  <year>/<month>/<day>-<title>/index.md',
            '  <year>/<month>/<day>-<title>/<sub>',
         ].join('\n')
      )
   }

   const [year, month, day, name, sub] = match.slice(1)

   const title = name.replace('.md', '')
   const timestamp = [year, month, day].join('')
   const url = '/' + timestamp + '-' + slugify(title) + (sub?.replace('index.md', '') ?? '')

   const date = {
      year: Number(year),
      month: Number(month),
      day: Number(day),
   }

   return {
      date,
      title,
      url,
   }
}

type RelatedPostData = {
   title: string
   url: string
}

export type Heading = {
   level: number
   id: string
   text: string
}

export type PostData = PostFileData & {
   path: string

   content: string
   excerpt: string
   headings: Heading[]

   next: RelatedPostData | null
   prev: RelatedPostData | null
}

const postsFiles = walk('./posts')
   .filter(path => not(path.includes('node_modules')))
   .filter(path => path.endsWith('.md'))

export const posts: PostData[] = postsFiles
   .map((path, idx) => {
      const { date, title, url } = getData(path)

      const content = markdown(path)
      const excerpt = content.split(/(?<=<\/p>)/)[0]

      const next = idx === 0 ? null : getData(postsFiles[idx - 1])
      const prev = idx === postsFiles.length - 1 ? null : getData(postsFiles[idx + 1])

      const $ = load(content)

      const titleHeading: Heading = {
         level: 1,
         id: slugify(title),
         text: title,
      }
      const headings = [titleHeading].concat(
         $('.post-heading')
            .toArray()
            .map(h => ({
               level: Number(h.tagName.replace('h', '')),
               id: h.attribs.id,
               text: $(h).text(),
            }))
      )

      return {
         content,
         date,
         excerpt,
         headings,
         next,
         path,
         prev,
         title,
         url,
      }
   })
   .reverse()

type PostAssetData = {
   path: string
   url: string
}

const postAssetsFiles = walk('./posts')
   .filter(path => not(path.includes('node_modules')))
   .filter(path => not(path.endsWith('.md')))
   .filter(path => not(['.prettierrc', '.DS_Store'].some(k => path.endsWith(k))))

export const postsAssets: PostAssetData[] = postAssetsFiles.map(path => {
   const { url } = getData(path)

   return {
      path,
      url,
   }
})
