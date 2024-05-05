export const Label = ({ type, placeholder, title, onChange }: any) => {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="font-semibold">{title}</div>
      <input
        className="outline-none border border-slate-300 rounded-md p-2"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  )
}
