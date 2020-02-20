import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import useFetch from '../hooks/useFetch'

const App = () => {
  const dispatch = useDispatch()
  const {
    fetching,
    fetchPostsIfNeeded,
    fetchSubreddit,
    isEmpty,
    lastUpdated,
    posts,
    selectedSubreddit,
  } = useFetch()

  useEffect(() => {
    fetchSubreddit()
  }, [fetchSubreddit])

  const handleRefreshClick = e => {
    e.preventDefault()
    dispatch(invalidateSubreddit(selectedSubreddit))
    fetchPostsIfNeeded()
  }

  return (
    <div>
      <Picker />
      <p>
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
          </span>
        )}
        {!fetching && <button onClick={handleRefreshClick}>Refresh</button>}
      </p>
      {isEmpty ? (
        fetching ? (
          <h2>Loading...</h2>
        ) : (
          <h2>Empty.</h2>
        )
      ) : (
        <div style={{ opacity: fetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      )}
    </div>
  )
}

export default App
