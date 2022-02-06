import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog tests', () => {
  const newBlog ={
    title: 'Something to test on',
    author: 'Simpo Sampo',
    url: 'https://testme.com/',
    likes: 2
  }

  let mockUpdateBlog = jest.fn()
  let mockRemoveBlog = jest.fn()

  test('blog renders title and author', () => {
    const component = render(
      <Blog id={newBlog.id} blog={newBlog}/>
    )
    //    console.log('First test')
    //    component.debug()
    //    console.log('---------------------')
    expect(component.container).toHaveTextContent(
      'Something to test on by: Simpo Sampo'
    )

  })

  test('after pressing, url and likes are displayed', () => {
    const component = render(
      <Blog id={newBlog.id} blog={newBlog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    //    component.debug()
    expect(component.container).toHaveTextContent(
      'https://testme.com/'
    )

    expect(component.container).toHaveTextContent(
      '2'
    )

  })

  test('like button pressed twice', () => {
    const component = render(
      <Blog id={newBlog.id} blog={newBlog} updateBlog={mockUpdateBlog}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)



  })



})