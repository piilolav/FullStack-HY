import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm tests', () => {

  test('BlogForm makes callbacks with right info', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector('#author')
    const form = component.container.querySelector('form')

    // component.debug()

    fireEvent.change(author, {
      target: { value: 'testing of forms could be easier' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('testing of forms could be easier')

  })

})