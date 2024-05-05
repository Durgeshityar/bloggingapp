import { useNavigate } from 'react-router-dom'

export const MiniCardMessage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#c3e3fb] h-64">
      <div className="flex flex-col p-6 gap-6">
        <div className="font-bold">Created clone of Medium</div>
        <div className="font-thin px-10">
          With lot of trial, <br /> error and love :) 💝
        </div>
        <div className="text-sm font-thin ml-6"> by - Durgesh Chandrakar</div>
        <button
          className="text-white bg-black py-2 
        px-3 w-fit ml-10 rounded-full"
          onClick={() => {
            navigate('/post')
          }}
        >
          Start Writing
        </button>
      </div>
    </div>
  )
}
