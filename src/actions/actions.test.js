import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './index'
import fetchMock from 'fetch-mock'

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

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('async actions', () => {
  const subreddit = 'reactjs'
  const endpoint = `https://www.reddit.com/r/${subreddit}.json`
  fetchMock.getOnce(endpoint, {
    body: { data: { children: [] } },
    headers: { 'content-type': 'application/json' },
  })

  const expectedActions = [
    { type: actions.REQUEST_POSTS, subreddit },
    {
      type: actions.RECEIVE_POSTS,
      subreddit,
      posts: [],
      receivedAt: Date.now(),
    },
  ]
  const store = mockStore({ postsBySubreddit: {} })

  return store.dispatch(actions.fetchPosts(subreddit)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions)
  })
})
