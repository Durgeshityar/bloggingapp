interface FollowButtonInput {
  followerId: number
  followingId: number
}

export const FollowButton = ({
  followerId,
  followingId,
}: FollowButtonInput) => {
  const fetch = async () => {}
  return (
    <div>
      <button className="my-0.5 text-white bg-green-600 text-sm px-2 py-0.5 rounded-full">
        FOLLOW
      </button>
    </div>
  )
}
