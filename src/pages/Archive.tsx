import React, { FC, Fragment } from 'react'
import { PostData, posts } from '~data/posts'
import Base from '~layouts/Base'

const postsByYear: { [year: string]: PostData[] } = {}

posts.forEach(x => {
   const { year } = x.date
   postsByYear[year] = postsByYear[year]?.concat(x) || [x]
})

const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

const Archive: FC = () => (
   <Base title="Archive">
      {years.map(year => (
         <Fragment key={year}>
            <h2>{year}</h2>

            <ul>
               {postsByYear[year].map(post => (
                  <li key={post.url}>
                     <a href={post.url}>{post.title}</a>
                  </li>
               ))}
            </ul>
         </Fragment>
      ))}
   </Base>
)

export default Archive
