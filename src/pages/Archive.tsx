import React, { FC } from 'react'
import Base from '~layouts/Base'

const Archive: FC = () => (
   <Base title="Archive">
      <h2>2017</h2>

      <ul className="list">
         <li>
            <a href="/20171206-prototype-tree">Prototype Tree</a>
         </li>

         <li>
            <a href="/20171130-cra-apps-with-ssr">CRA apps with SSR</a>
         </li>

         <li>
            <a href="/20170902-write-a-stream-ripper-with-mediarecorder">
               Write a stream ripper with MediaRecorder
            </a>
         </li>

         <li>
            <a href="/20170827-tiny-transfers">Tiny Transfers</a>
         </li>

         <li>
            <a href="/20170730-correct-blur-with-de-gamma/">Correct blur with de-gamma</a>
         </li>

         <li>
            <a href="/20170622-obfuscation-with-protext/">Obfuscation With Protext</a>
         </li>

         <li>
            <a href="/20170525-react-router-modals-the-way-twitter-pinterest-do-it">
               react-router modals the way Twitter &amp; Pinterest do it
            </a>
         </li>

         <li>
            <a href="/20170327-animating-dots-dashes">Animating Dots &amp; Dashes</a>
         </li>

         <li>
            <a href="/20170302-ssh-into-private-machines/">SSH Into Private Machines</a>
         </li>

         <li>
            <a href="/20170213-rename-a-function">Rename a function</a>
         </li>

         <li>
            <a href="/20170129-timing-controls-2-throttle">Timing Controls 2 - Throttle</a>
         </li>

         <li>
            <a href="/20170122-timing-controls-1-debounce">Timing Controls 1 - Debounce</a>
         </li>

         <li>
            <a href="/20170108-flowtype-modern-js/">Flowtype &amp; Modern JS</a>
         </li>
      </ul>
   </Base>
)

export default Archive
