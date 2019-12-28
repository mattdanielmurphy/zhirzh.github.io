import React, { FC } from 'react'
import { Heading } from '~data/posts'

type ContentsNode = {
   value: Heading
   children: ContentsNode[]
}

function parseHeadings(headings: Heading[], level: number): ContentsNode[] {
   if (headings.length === 0) {
      return []
   }

   const levelHeadings = headings.filter(h => h.level === level)
   const levelIndexes = levelHeadings.map(h => headings.indexOf(h))

   return levelIndexes.map((_, i) => {
      const levelStart = levelIndexes[i]
      const levelEnd = levelIndexes[i + 1]
      const subHeadings = headings.slice(levelStart + 1, levelEnd)

      return {
         value: headings[levelStart],
         children: parseHeadings(subHeadings, level + 1),
      }
   })
}

function render(contents: ContentsNode[], level = 1) {
   if (contents.length === 0) {
      return null
   }

   return (
      <ul>
         {contents.map(({ value, children }, i) => (
            <li key={value.id}>
               <a
                  href={`#${value.id}`}
                  className={level === 1 && i === 0 ? 'current-section' : undefined}
               >
                  {value.text}
               </a>
               {render(children, level + 1)}
            </li>
         ))}
      </ul>
   )
}

type Props = {
   headings: Heading[]
}

const Contents: FC<Props> = ({ headings }: Props) => (
   <aside className="contents">
      Contents
      <nav>{render(parseHeadings(headings, 1))}</nav>
      <script
         dangerouslySetInnerHTML={{
            __html: scrollScript,
         }}
      />
   </aside>
)

const scrollScript = `
const topThreshold = 20

const initialTop = 270 // refer index.css for .contents top offset
const finalTop = 100

let prevTop = 0

window.addEventListener('scroll', main, {
   passive: true,
})

window.addEventListener('resize', main, {
   passive: true,
})

function main() {
   if (window.innerWidth >= 1300) {
      moveSidebar()
      highlightCurrentSection()
   } else {
      resetSidebar()
   }
}

function moveSidebar() {
   const top = Math.max(finalTop, initialTop - window.scrollY)

   if (prevTop !== top) {
      const $contents = document.querySelector('.contents')
      $contents.style.top = top + 'px'

      prevTop = top
   }
}

function highlightCurrentSection() {
   const $contents = document.querySelector('.contents')

   const $targetLink = Array.from($contents.querySelectorAll('a'))
      .reverse()
      .find((a, i) => {
         const id = a.getAttribute('href').slice(1)
         const h = document.getElementById(id)
         const top = h.getBoundingClientRect().top
         return top < topThreshold
      })

   if (!$targetLink) {
      return
   }

   $contents.querySelectorAll('.current-section').forEach($currentSection => {
      $currentSection.classList.remove('current-section')
   })

   $targetLink.classList.add('current-section')
}

function resetSidebar() {
   const $contents = document.querySelector('.contents')

   $contents.style.top = 0

   $contents.querySelectorAll('.current-section').forEach($currentSection => {
      $currentSection.classList.remove('current-section')
   })
}
`

export default Contents
