import { useQuery } from '@tanstack/react-query'
import { getUserFriends } from '../lib/api'
import FriendCard from '../components/FriendCard'
import NoFriendsFound from '../components/NoFriendsFound'

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ['friends-list'],
    queryFn: getUserFriends
  })

  if (isLoading)
    return (
      <div className='flex justify-center py-20'>
        <span className='loading loading-spinner loading-lg' />
      </div>
    )

  if (friends.length === 0) return <NoFriendsFound />

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold mb-6'>Your Friends</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {friends.map(friend => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    </div>
  )
}

export default FriendsPage
