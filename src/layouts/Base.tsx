import React, { FC } from 'react'
import Lamp from '~components/Lamp'

type Props = {
   title: string
}

const Base: FC<Props> = ({ children, title }) => (
   <html lang="en-US">
      <head>
         <meta charSet="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

         <title>{title}</title>

         <link rel="stylesheet" href="/index.css" />
         <script src="/sw.js"></script>
      </head>

      <body>
         <div className="fonts-loader">
            <div>0</div>
            <div style={{ fontStyle: 'italic' }}>1</div>
            <div style={{ fontWeight: 'bold' }}>2</div>
            <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>3</div>
         </div>

         <header className="main-nav">
            <nav>
               <ul className="nav-list">
                  <li>
                     <h1>
                        <a href="/">Blog</a>
                     </h1>
                  </li>

                  <li>
                     <a href="/archive">Archive</a>
                  </li>

                  <li>
                     <a href="/about">About</a>
                  </li>
               </ul>
            </nav>

            <Lamp />
         </header>

         {children}

         <footer className="social-links">
            <nav>
               <ul className="nav-list">
                  <li>
                     <a target="_blank" href="https://github.com/zhirzh">
                        github
                     </a>
                  </li>

                  <div className="dot">•</div>

                  <li>
                     <a target="_blank" href="https://medium.com/@zhirzh">
                        medium
                     </a>
                  </li>

                  <div className="dot">•</div>

                  <li>
                     <a target="_blank" href="https://twitter.com/zhirzh">
                        twitter
                     </a>
                  </li>

                  <div className="dot">•</div>

                  <li>
                     <a target="_blank" href="https://www.linkedin.com/in/shirsh-zibbu">
                        linkedin
                     </a>
                  </li>

                  <div className="dot">•</div>

                  <li>
                     <a target="_blank" href="https://stackoverflow.com/users/1343488/zhirzh">
                        stackoverflow
                     </a>
                  </li>
               </ul>
            </nav>
         </footer>
      </body>
   </html>
)

export default Base
