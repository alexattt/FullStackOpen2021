import React from 'react'
import { connect } from 'react-redux' 
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(
  null, 
  { createNote }
)(NewNote)

// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { createNote } from '../reducers/noteReducer'
// import noteService from '../services/notes'

// const NewNote = () => {
//   const dispatch = useDispatch()

//   const addNote = async (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''
//     dispatch(createNote(content))
//   }

//   return (
//     <form onSubmit={addNote}>
//       <input name="note" />
//       <button type="submit">add</button>
//     </form>
//   )
// }

// export default NewNote