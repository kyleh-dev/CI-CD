import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blogs'

describe('Blog', () => {
  beforeEach(() => {
    const blogTest = {
      title: 'testing title',
      author: 'testing author',
      source_url: 'testing url',
      quote: 'testing quote'
    }

    render(
      <Blog blog={blogTest}/>
    )

    screen.debug()
  })

  test('at start blog title and author are displayed, but not quote or url', () => {
    const intro = screen.getByTestId('blog-intro')
    const details = screen.getByText('testing url').parentElement
    expect(intro).toBeVisible()
    expect(details).not.toBeVisible()
  })

  test('after clicking button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const details = screen.getByText('testing url').parentElement
    expect(details).toBeVisible()
  })
})

