import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { receivePosts } from '../actions'

const shouldFetchPosts = posts => {
  if (!posts) {
    return true
  }
  return posts.didInvalidate
}

const useFetch = () => {
  const [fetching, setFetching] = useState(false)
  const selectedSubreddit = useSelector(state => state.selectedSubreddit)
  const postsBySubreddit = useSelector(state => state.postsBySubreddit)
  const dispatch = useDispatch()

  const fetchSubreddit = useCallback(async () => {
    setFetching(true)
    try {
      const result = await fetch(
        `https://www.reddit.com/r/${selectedSubreddit}.json`
      )
      setFetching(false)
      const response = await result.json()
      dispatch(receivePosts(selectedSubreddit, response))
    } catch (e) {
      setFetching(false)
    }
  }, [selectedSubreddit, dispatch])

  const fetchPostsIfNeeded = () => {
    if (shouldFetchPosts(postsBySubreddit[selectedSubreddit])) {
      fetchSubreddit()
    }
  }

  return {
    fetchPostsIfNeeded,
    selectedSubreddit,
    postsBySubreddit,
    fetchSubreddit,
    fetching,
  }
}

export default useFetch
