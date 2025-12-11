import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { acceptFriendRequest, getFriendRequests } from '../lib/api'

const Notification = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    }
  })

  return (
    <div>
      <h1>Page...</h1>
    </div>
  )
}

export default Notification
