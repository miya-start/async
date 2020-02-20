import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Picker from './Picker'

test('subredditを選択したら、イベントハンドラを呼び出す。引数には選択したsubredditが渡される', () => {
  const handleChange = jest.fn()
  const defaultValue = 'reactjs'
  const selectValue = 'frontend'
  const subreddits = [defaultValue, selectValue]

  render(
    <Picker onChange={handleChange} value={defaultValue} options={subreddits} />
  )

  user.selectOptions(screen.getByTestId('select-subreddit'), [selectValue])

  expect(handleChange).toHaveBeenCalledWith(selectValue)
  expect(handleChange).toHaveBeenCalledTimes(1)
})
