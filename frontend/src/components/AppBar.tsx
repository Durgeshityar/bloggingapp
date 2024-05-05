import { useNavigate } from 'react-router-dom'
import { Mediumsvg, notificationSvg, userSvg, writeSvg } from './SVGS'
import { SearchBar } from './SearchBar'
import axios from 'axios'
import { DB_URL } from '../config'

interface appBarInput {
  publish: boolean
  input?: { title: string; content: string }
}
export const AppBar = ({ publish, input }: appBarInput) => {
  const navigate = useNavigate()

  const handleRequest = async () => {
    try {
      const response = await axios.post(`${DB_URL}/api/v1/blog`, input, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      const data = response.data
      console.log(data)
      navigate('/blog')
      // getting back "id:7" after this navigate to some other page
      // refrain users from adding blank posts
    } catch (e) {
      console.error(` error while sending reques => ${e}`)
      // add alert library here
    }
  }
  return (
    <div className=" flex justify-between p-2 shadow-sm">
      <div className="flex items-center gap-4 pl-8">
        <div
          onClick={() => {
            navigate('/blog')
          }}
        >
          {Mediumsvg()}
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className=" flex items-center gap-5 pr-8">
        {publish ? (
          <button
            onClick={handleRequest}
            className="bg-green-600 text-white px-3 py-1/2 rounded-2xl"
          >
            Publish
          </button>
        ) : (
          <div className=" flex gap-3">
            <div
              onClick={() => {
                navigate('/post')
              }}
            >
              {writeSvg()}
            </div>
            <p className=" text-lg text-slate-800 font-thin">Write</p>
          </div>
        )}

        <div> {notificationSvg()} </div>
        <div> {userSvg()} </div>
      </div>
    </div>
  )
}
