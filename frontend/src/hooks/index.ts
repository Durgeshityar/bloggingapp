import axios from 'axios'
import { useEffect, useState } from 'react'
import { DB_URL } from '../config'

export interface BlogCardInput {
  author: { name: string } // Assuming author is an object with a name property
  title: string
  id: number
  content: string
  createdAt: string
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<BlogCardInput[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${DB_URL}/api/v1/blog`, {
          headers: {
            Authorization: localStorage.getItem('Token'),
          },
        })
        setBlogs(response.data.blogs)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }

    fetchBlogs()
  }, [])

  return { loading, blogs }
}
