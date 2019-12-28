import React, { FC } from 'react'
import Contents from '~components/Contents'
import { PostData } from '~data/posts'
import slugify from '~slugify'
import Base from './Base'

type Props = {
   post: PostData
}

const Post: FC<Props> = ({ post }) => (
   <Base title={post.title}>
      <h1 id={slugify(post.title)} className="post-heading">
         <a href={`#${slugify(post.title)}`}>{post.title}</a>
      </h1>

      <Contents headings={post.headings} />

      <article
         dangerouslySetInnerHTML={{
            __html: post.content,
         }}
      />

      <footer className="related-posts">
         <nav>
            <ul className="nav-list">
               {post.prev && (
                  <li className="related-posts-prev">
                     <a href={post.prev.url}>⟵ {post.prev.title}</a>
                  </li>
               )}

               {post.next && (
                  <li className="related-posts-next">
                     <a href={post.next.url}>{post.next.title} ⟶</a>
                  </li>
               )}
            </ul>
         </nav>
      </footer>
   </Base>
)

export default Post
