import { AppBar } from '../components/AppBar'
import { BlogCrad } from '../components/BlogCard'
import { RightSideContainer } from '../components/RightSideContainer'
import Skeleton from '../components/Skeleton'
import { useBlogs } from '../hooks'

export const Blogs = () => {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return (
      <div>
        <AppBar publish={false} />
        <div className="flex justify-between">
          <div className="w-full p-5 flex flex-col gap-3">
            <Skeleton contentHeight={'44'} />
            <Skeleton contentHeight={'44'} />
            <Skeleton contentHeight={'44'} />
          </div>
          <div className="hidden  xl:block">{/* <RightSideContainer /> */}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppBar publish={false} />
      <div className="flex justify-between">
        <div className="w-full p-5">
          {blogs?.map((blog) => {
            const authorName = blog.author
            return (
              <div>
                <BlogCrad
                  key={blog.id}
                  author={authorName}
                  title={blog.title}
                  id={blog.id}
                  content={blog.content}
                  createdAt={blog.createdAt}
                />
              </div>
            )
          })}
        </div>
        <div className="hidden  xl:block">
          <RightSideContainer />
        </div>
      </div>
    </div>
  )
}

// this page is for showing all the blogs
