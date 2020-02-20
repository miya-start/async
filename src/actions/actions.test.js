import { renderHook, act } from '@testing-library/react-hooks'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import {
  useSelector as useSelectorMock,
  useDispatch as useDispatchMock,
} from 'react-redux'
import * as actions from './index'
import useFetch from '../hooks/useFetch'

jest.mock('react-redux')
const RealDate = Date.now

beforeAll(() => {
  Date.now = jest.fn(() => new Date('2020-02-07T10:20:30Z').getTime())
})

afterEach(() => {
  fetchMock.restore()
})

afterAll(() => {
  Date.now = RealDate
})

test('async actions', async () => {
  // storeをmockする
  const store = configureMockStore()({ postsBySubreddit: {} })
  const defaultValue = 'reactjs'

  const subreddit = 'reactjs'
  const endpoint = `https://www.reddit.com/r/${subreddit}.json`
  const post1 = { title: 'title1' }
  const post2 = { title: 'title2' }
  const fetchedPosts = [{ data: post1 }, { data: post2 }]
  const expectedAction = [
    {
      type: actions.RECEIVE_POSTS,
      posts: [post1, post2],
      subreddit,
      receivedAt: Date.now(),
    },
  ]

  useSelectorMock.mockReturnValue(defaultValue)
  useDispatchMock.mockReturnValue(store.dispatch)

  fetchMock.getOnce(endpoint, {
    body: { data: { children: fetchedPosts } },
    headers: { 'content-type': 'application/json' },
  })

  const { result } = renderHook(() => useFetch())

  await act(async () => {
    await result.current.fetchSubreddit(subreddit)

    expect(store.getActions()).toEqual(expectedAction)
  })
})
