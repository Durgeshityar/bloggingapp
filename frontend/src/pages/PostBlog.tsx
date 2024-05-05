import { AppBar } from '../components/AppBar'
import { CreateBlog } from '../components/CreateBlog'
import { CreateBlogInput } from '@durgeshityaar/medium-common2'
import { useState } from 'react'

export const PostBlog = () => {
  const [input, setInput] = useState<CreateBlogInput>({
    title: '',
    content: '',
  })
  return (
    <div className=" flex flex-col gap-4">
      <div>
        <AppBar publish={true} input={input} />
      </div>
      <div className="mx-40">
        <CreateBlog
          onChange1={(e) => {
            setInput((c) => ({
              ...c,
              title: e.target.value,
            }))
          }}
          onChange2={(e) => {
            setInput((c) => ({
              ...c,
              content: e.target.value,
            }))
          }}
        />
      </div>
    </div>
  )
}
