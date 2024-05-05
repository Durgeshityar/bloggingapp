import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const AuthHeaderSignup = ({
  title,
  subTitle1,
  subTitle2,
  routeName,
}: any) => {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    if (routeName === '/signin') {
      setToggle(true)
    }
  }, [routeName])
  return (
    <div className="flex flex-col p-3 gap-2">
      <div className="text-3xl font-bold"> {title}</div>
      <div className="flex gap-2 text-slate-500 font-medium">
        <p>{subTitle1}</p>
        <p className="underline">
          <Link to={toggle ? '/signin' : '/signup'}>{subTitle2}</Link>
        </p>
      </div>
    </div>
  )
}
