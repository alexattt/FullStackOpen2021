import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> renders correctly', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#blog-title-input')
  const authorInput = component.container.querySelector('#blog-author-input')
  const urlInput = component.container.querySelector('#blog-url-input')
  const likesInput = component.container.querySelector('#blog-likes-input')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { 
    target: { value: 'Test blog title' } 
  })
  fireEvent.change(authorInput, { 
    target: { value: 'Test blog author' } 
  })
  fireEvent.change(urlInput, { 
    target: { value: 'Test blog url' } 
  })
  fireEvent.change(likesInput, { 
    target: { value: 100 } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toEqual('Test blog title')
  expect(createBlog.mock.calls[0][0].author).toEqual('Test blog author')
  expect(createBlog.mock.calls[0][0].url).toEqual('Test blog url')
  expect(createBlog.mock.calls[0][0].likes).toEqual('100')
})