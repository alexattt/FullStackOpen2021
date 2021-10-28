import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from './queries'

const YearForm = ({ setError }) => {
  const [name, setName] = useState('')
  // had to use setBornTo instead of year, because it was used in graphql query
  const [setBornTo, setBirthYear] = useState('')

  const [ changeBirthYear, result] = useMutation(EDIT_BIRTH_YEAR)

  useEffect(() => {
    if ( result.data && !result.data.editAuthor) {
      setError('Name not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])
  
  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, setBornTo } })

    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>change birth year</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          birth year <input
            value={setBornTo}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>change birth year</button>
      </form>
    </div>
  )
}

export default YearForm