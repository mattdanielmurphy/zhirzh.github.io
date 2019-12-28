import { Slugger } from 'marked'

const cachedSlugger = new Slugger()

function slugify(text: string, unique = false) {
   return unique ? cachedSlugger.slug(text) : new Slugger().slug(text)
}

export default slugify
