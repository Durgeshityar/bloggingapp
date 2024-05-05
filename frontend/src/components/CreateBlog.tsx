export const CreateBlog = ({ onChange1, onChange2 }: any) => {
  return (
    <div className="flex flex-col gap-2 font-serif">
      <div>
        <textarea
          id="message"
          rows={2}
          className={`block outline-none p-2.5 w-full text-3xl text-gray-900  rounded-lg border border-slate-200`}
          placeholder="Title"
          onChange={onChange1}
        ></textarea>
      </div>

      <div>
        <textarea
          id="message"
          rows={15}
          className={`block p-2.5 w-full text-lg text-gray-900 rounded-lg outline-none  border border-slate-200`}
          placeholder="Tell your Story..."
          onChange={onChange2}
        ></textarea>
      </div>
    </div>
  )
}
