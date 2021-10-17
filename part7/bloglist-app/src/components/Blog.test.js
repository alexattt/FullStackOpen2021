import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const testBlog = {
    title: 'Testing react apps',
    author: 'Alexa T'
  }

  const component = render(
    <Blog blog={testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing react apps'
  )
})

test('url and number of likes are shown when view button is clicked', () => {
  const testBlog = {
    title: 'Testing react apps',
    author: 'Alexa T',
    url: 'www.testurl.com',
    likes: 10
  }

  const component = render(
    <Blog blog={testBlog} />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.show-all-blog-info')
  expect(div).not.toHaveStyle('display: none')
})

test('if like button is clicked twice, the event handler is called twice', () => {
  const testBlog = {
    title: 'Testing react apps',
    author: 'Alexa T',
    url: 'www.testurl.com',
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={testBlog} onClickUpdateLikes={mockHandler} />
  )

  const button = component.getByText('❤')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('', () => {
  const testBlog = {
    title: 'Testing react apps',
    author: 'Alexa T',
    url: 'www.testurl.com',
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={testBlog} onClickUpdateLikes={mockHandler} />
  )

  const button = component.getByText('❤')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

