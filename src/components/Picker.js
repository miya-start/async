import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSubreddit } from '../actions'

const Picker = () => {
  const selectedSubreddit = useSelector(state => state.selectedSubreddit)
  const dispatch = useDispatch()
  const options = ['reactjs', 'frontend']

  const handleChange = nextSubreddit => {
    dispatch(selectSubreddit(nextSubreddit))
  }

  return (
    <span>
      <h1>{selectedSubreddit}</h1>
      <select
        onChange={e => handleChange(e.target.value)}
        value={selectedSubreddit}
        data-testid="select-subreddit"
      >
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  )
}

export default Picker
