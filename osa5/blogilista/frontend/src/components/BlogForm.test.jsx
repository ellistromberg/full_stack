import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls createBlog with correct info when new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getAllByRole('textbox')[0]
  const authorInput = screen.getAllByRole('textbox')[1]
  const urlInput = screen.getAllByRole('textbox')[2]
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test title')
  await user.type(authorInput, 'Test author')
  await user.type(urlInput, 'http://test.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({ 
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.fi'
  })
})