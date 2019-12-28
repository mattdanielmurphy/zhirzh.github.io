import React, { FC } from 'react'

const r = 20

const Lamp: FC = () => (
   <>
      <button className="lamp">
         <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={r + r / 2 + r / 4} fill="none" strokeWidth={r / 2} />
            <path d={`M 50 ${50 + r} A ${r} ${r} 0 0 1 50 ${50 - r}`} />
            <path d={`M 50 ${50 + r} A ${r} ${r} 0 0 0 50 ${50 - r}`} />
         </svg>
      </button>

      <script
         dangerouslySetInnerHTML={{
            __html: lampScript,
         }}
      />
   </>
)

const lampScript = `
document.querySelector('.lamp').addEventListener('click', toggleColorScheme)

const darkModeMediaQuery = matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addListener(toggleColorScheme)

const documentClasses = document.documentElement.classList
documentClasses.add(getColorScheme())

function getColorScheme() {
   const savedColorScheme = localStorage.getItem('color-scheme')

   if (savedColorScheme) {
      return savedColorScheme === 'dark' ? 'dark' : 'light'
   }

   return darkModeMediaQuery.matches ? 'dark' : 'light'
}

function toggleColorScheme() {
   const colorScheme = getColorScheme()
   documentClasses.remove(colorScheme)

   const nextColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
   documentClasses.add(nextColorScheme)
   localStorage.setItem('color-scheme', nextColorScheme)
}
`

export default Lamp
