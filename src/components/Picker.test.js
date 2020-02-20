import React from 'react'
import user from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock,
} from 'react-redux'
import { selectSubreddit } from '../actions'
import Picker from './Picker'

jest.mock('react-redux')

test('subredditを選択したら、Action Creatorを呼び出す。引数には選択したsubredditが渡される', () => {
  const selectValue = 'frontend'
  // react-reduxをmockする
  const defaultValue = 'reactjs'
  const mockDispatch = jest.fn()
  useSelectorMock.mockReturnValue(defaultValue)
  useDispatchMock.mockReturnValue(mockDispatch)

  render(<Picker />)

  user.selectOptions(screen.getByTestId('select-subreddit'), [selectValue])

  expect(mockDispatch).toHaveBeenCalledWith(selectSubreddit(selectValue))
  expect(mockDispatch).toHaveBeenCalledTimes(1)
})
