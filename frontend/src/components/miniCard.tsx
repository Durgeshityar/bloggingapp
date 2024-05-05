export const MiniCard = ({ name, title }: { name: string; title: string }) => {
  return (
    <div className="hover:cursor-pointer">
      <div className="flex items-center">
        <div className="p-3 pl-0">{getInitial('durgesh')}</div>
        <div className="p-3 pl-0 text-slate-800 font-thin">{name}</div>
      </div>
      <div className="font-bold"> {title}</div>
    </div>
  )
}

const getInitial = (name?: string) => {
  return (
    <div>
      <div className="w-8 h-8 flex justify-center items-center bg-slate-400 rounded-full ">
        {name ? name[0] : 'U'}
      </div>
    </div>
  )
}
