import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('blog input', () => {
  const mockhandler = vi.fn()

  beforeEach(() => {
    render(<BlogForm addBlog={mockhandler}/>)
  })

  test('after submit button is triggered', async () => {
    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('Url')
    const quoteInput = screen.getByLabelText('Quote')
    await user.type(titleInput, 'testing title')
    await user.type(authorInput, 'testing author')
    await user.type(urlInput, 'testing url')
    await user.type(quoteInput, 'testing quote')
    screen.debug()

    const button = screen.getByText('Create')
    await user.click(button)
    expect(mockhandler).toHaveBeenCalledTimes(1)
    expect(mockhandler.mock.calls[0][0].title).toBe('testing title')
  })
})