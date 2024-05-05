export const SearchBar = () => {
  return (
    <div className=" flex items-center bg-slate-100 px-2 py-1.5 rounded-2xl">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z "
          />
        </svg>
      </div>
      <input
        className=" outline-none px-2 bg-slate-100"
        placeholder="Search"
      ></input>
    </div>
  )
}
