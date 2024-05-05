import { useEffect, useState } from 'react'
import axios from 'axios'
import { DB_URL } from '../config'
import Skeleton from '../components/Skeleton'
import { useParams } from 'react-router-dom'
import { FullBlog } from '../components/FullBlog'
import { AppBar } from '../components/AppBar'

export interface FullBlogInput {
  content: string
  title: string
  createdAt: string
  author: {
    name: string
  }
}

export const Blog = () => {
  const [blog, setBlog] = useState<FullBlogInput[]>()
  const [loading, setLoading] = useState(true)
  const id = useParams()

  useEffect(() => {
    axios
      .get(`${DB_URL}/api/v1/blog/${id.id}`, {
        headers: { Authorization: localStorage.getItem('Token') },
      })
      .then((r) => {
        setBlog(r.data.post)
        setLoading(false)
        console.log(blog)
      })
  }, [])

  return (
    <div>
      {loading ? (
        <div>{<Skeleton contentHeight={'screen'} />}</div>
      ) : (
        <div>
          <div className=" fixed w-screen bg-white">
            <AppBar publish={false} />
          </div>
          <div className="mx-72 pt-28">
            <FullBlog
              author={{ name: blog?.author.name }}
              title={blog?.title}
              content={blog?.content}
              createdAt={blog?.createdAt}
            />
          </div>
        </div>
      )}
    </div>
  )
}
