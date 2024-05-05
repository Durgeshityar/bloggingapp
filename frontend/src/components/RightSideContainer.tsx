import { useEffect, useState } from 'react'

import axios from 'axios'
import { DB_URL } from '../config'
import { Link } from 'react-router-dom'
import { MiniCard } from './miniCard'
import { MiniCardMessage } from './MiniCardMessage'

interface miniCard {
  title: string
  author: { name: string }
}
export const RightSideContainer = () => {
  const [blog, setBlog] = useState<miniCard[]>()
  console.log(blog)

  useEffect(() => {
    axios
      .get(`${DB_URL}/api/v1/blog/14`, {
        headers: { Authorization: localStorage.getItem('Token') },
      })
      .then((r) => {
        setBlog(r.data.post)
      })
  }, [])

  return (
    <div className="p-8 flex flex-col gap-16 ">
      <div>
        <div className="font-semibold">staff Picks</div>
        <Link to={`/blog/14`}>
          <MiniCard name={blog?.author.name} title={blog?.title} />
        </Link>
      </div>
      <div>
        <MiniCardMessage />
      </div>
    </div>
  )
}
