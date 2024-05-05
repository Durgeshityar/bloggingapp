const Skeleton = ({
  contentHeight = '32',
}: {
  contentHeight: number | string
}) => {
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg p-4 animate-pulse">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse mr-2"></div>{' '}
        {/* Avatar */}
        <div className="flex flex-col">
          <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-full mb-1"></div>{' '}
          {/* Username */}
          <div className="w-16 h-2 bg-gray-300 animate-pulse rounded-full"></div>{' '}
          {/* Date */}
        </div>
      </div>
      <div
        className={`w-full h-${contentHeight} bg-gray-300 animate-pulse rounded-lg`}
      ></div>{' '}
      {/* Tweet Content */}
      <div className="flex mt-4 h-40">
        <div className="w-12 h-2 bg-gray-300 animate-pulse mr-2 rounded-full"></div>{' '}
        {/* Read time */}
      </div>
    </div>
  )
}

export default Skeleton
