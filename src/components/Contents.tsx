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
         {contents.map(({ value, children }) => (
            <li key={value.id}>
               <a href={`#${value.id}`}>{value.text}</a>
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
   <>
      <aside className="contents">
         Contents
         <nav>{render(parseHeadings(headings, 1))}</nav>
      </aside>

      <script
         dangerouslySetInnerHTML={{
            __html: scrollScript,
         }}
      />
   </>
)

const scrollScript = `
const topThreshold = 20

const initialTop = 270 // refer index.css for .contents top offset
const finalTop = 100

let prevTop = 0

window.addEventListener('scroll', contentsMain, {
   passive: true,
})

window.addEventListener('resize', contentsMain, {
   passive: true,
})

setTimeout(contentsMain, 1000)

function contentsMain() {
   if (window.innerWidth >= 1300) {
      moveSidebar()
      highlightCurrentSection()
   } else {
      resetSidebar()
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

function moveSidebar() {
   const top = Math.max(finalTop, initialTop - window.scrollY)

   if (prevTop === top) {
      return
   }

   prevTop = top

   const $contents = document.querySelector('.contents')
   $contents.style.top = top + 'px'
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
