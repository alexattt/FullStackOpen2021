import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"
import  { useField } from './hooks'
import React, { useState } from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Input,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import './App.css'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map(anecdote =>
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id) 
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a></p>
    </div>
  )
}

const Notification = ({ notification }) => {
  return (
    <div>
      <Alert severity="success">
        {notification}
      </Alert>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div class='footer'>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    var content = contentField.value
    var author = authorField.value
    var info = infoField.value

    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
  }

  const resetFields = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div class='flex'>
      <h2>Create new, awesome anecdote</h2>
      <form onSubmit={handleSubmit} class="joke-form">
        <Input placeholder='joke' name='content' type={contentField.type} value={contentField.value} onChange={contentField.onChange} />
        <br/> 
        <Input placeholder='author' name='author' type={authorField.type} value={authorField.value} onChange={authorField.onChange} />
        <br /> 
        <Input placeholder='URL for more info' name='info' type={infoField.type} value={infoField.value} onChange={infoField.onChange} />
        <br /> 
        <Button type='Submit' size='small' variant="outlined">Create</Button>
        <Button type='reset' size='small' onClick={()=> resetFields()}>Reset</Button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [alert, setAlert] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAlert(true)
    setNotification(
      `A new anecdote "${anecdote.content}" created!`
    )
    setTimeout(() => {
      setNotification(null)
      setAlert(false)
    }, 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Container>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                anecdotes
              </Button>
              <Button color="inherit" component={Link} to="/create">
                create new
              </Button>
              <Button color="inherit" component={Link} to="/about">
                about
              </Button>                               
            </Toolbar>
          </AppBar>

          {alert === true &&
            <Notification notification={notification} />
          }

          <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
            <Route path="/create">
              <CreateNew addNew={addNew} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <AnecdoteList anecdotes={anecdotes} />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </Container>
    </div>
  )
}

export default App;