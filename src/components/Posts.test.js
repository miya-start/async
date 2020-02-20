import React from 'react'
import { render, screen } from '@testing-library/react'
import Posts from './Posts'

const posts = [
  {
    title: 'title1',
  },
  {
    title: 'title2',
  },
]

test('タイトル一覧を表示する', () => {
  render(<Posts posts={posts} />)

  const titleElement = screen.getByText(/title2/i)

  expect(titleElement).toBeInTheDocument()
})
