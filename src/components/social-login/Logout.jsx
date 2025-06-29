import React from 'react'
import { doLogout } from '../../app/actions/index';

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className='bg-red-500 border rounded-md p-2 m-2' type='submit'>
        Logout
      </button>
    </form>
  )
}

export default Logout