import { Link } from 'react-router-dom'
import { FollowButton } from './FollowButton'

export const BlogCrad = ({ title, author, createdAt, content, id }: any) => {
  console.log(author.name)
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex  flex-col gap-2">
        <div className="flex gap-3 items-center">
          <div className="px-1 ">{getInitial(author.name)} </div>
          <div className="font-medium text-sm"> {author.name} </div>
          <div>{circle()}</div>
          <div className="text-slate-500 font-thin text-sm">
            {' '}
            {extractDate(createdAt)}{' '}
          </div>
          <FollowButton />
        </div>
        <div className="font-bold">{title}</div>
        <div>{content?.slice(0, 300) + ' ....'}</div>
        <div className="text-slate-500 text-sm font-thin">
          {Math.round(content.length / 200)} min read
        </div>
        <div className="pt-3">
          <hr />
        </div>
      </div>
    </Link>
  )
}

const getInitial = (name?: string) => {
  return (
    <div>
      <div className="w-6 h-6 flex justify-center items-center bg-slate-400 rounded-full ">
        {name ? name[0] : 'U'}
      </div>
    </div>
  )
}

const circle = () => {
  return <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
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
