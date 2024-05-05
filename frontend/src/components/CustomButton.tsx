export const CustomButton = ({ title, onClick }) => {
  return (
    <div className="p-3 flex flex-col">
      <button className="text-white bg-black rounded-md py-2" onClick={onClick}>
        {title}
      </button>
    </div>
  )
}
