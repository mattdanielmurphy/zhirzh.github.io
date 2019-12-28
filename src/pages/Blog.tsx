import React, { FC, Fragment } from 'react'
import { posts } from '~data/posts'
import Base from '~layouts/Base'

const Blog: FC = () => (
   <Base title="Blog">
      {posts.map(post => (
         <Fragment key={post.url}>
            <h2 className="post-heading">
               <a href={post.url}>{post.title}</a>
            </h2>

            <article
               dangerouslySetInnerHTML={{
                  __html: post.excerpt,
               }}
            />
         </Fragment>
      ))}
   </Base>
)

export default Blog
