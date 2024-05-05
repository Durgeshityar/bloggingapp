import { FullBlogInput } from '../pages/Blog'

export const FullBlog = ({
  title,
  author,
  createdAt,
  content,
}: FullBlogInput) => {
  return (
    <div className="flex flex-col  gap-5">
      <div className="text-3xl font-bold">{title}</div>
      <div className=" flex items-center">
        <div className="p-3 pl-0">{getInitial(author.name)}</div>
        <div className="flex flex-col">
          <div className="font-light text-lg">{author.name}</div>
          <div className="text-sm text-slate-500">
            {Math.round(content.length / 200)} min read
            <span className="pl-4">{extractDate(createdAt)}</span>
          </div>
        </div>
      </div>
      <div>{content}</div>
    </div>
  )
}

const getInitial = (name: string) => {
  return (
    <div>
      <div className="w-12 h-12 flex justify-center items-center bg-slate-400 rounded-full ">
        {name ? name[0] : 'U'}
      </div>
    </div>
  )
}

function extractDate(dateStr: string): string | null {
  try {
    // Parse the date string as a datetime object
    const dateObj = new Date(dateStr)

    // Extract day, month name (full format), and year
    const day = dateObj.toLocaleDateString('en-US', { day: 'numeric' })
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' })
    const year = dateObj.toLocaleDateString('en-US', { year: 'numeric' })

    // Format the extracted date
    return `${day} ${month} ${year}`
  } catch (error) {
    console.error('Error parsing date string:', error)
    return null
  }
}
