import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.fi',
    likes: 1,
    user: {username: 'testUsername', name: 'Test user'},
  }

  render(<Blog blog={blog} user={{ username: 'testUsername' }} />)
  screen.debug()

  const element = screen.getAllByText('Test title Test author')
  expect(element).toBeDefined()
})

test('clicking the view button shows more info', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.fi',
    likes: 1,
    user: {username: 'testUsername', name: 'Test user'},
  }

  render(
    <Blog blog={blog} user={{ username: 'testUsername' }} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element1 = screen.getByText('http://test.fi')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('likes 1')
  expect(element2).toBeDefined()
  const element3 = screen.getByText('Test user')
  expect(element3).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.fi',
    likes: 1,
    user: {username: 'testUsername', name: 'Test user'},
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} onLike={mockHandler} user={{ username: 'testUsername' }} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
