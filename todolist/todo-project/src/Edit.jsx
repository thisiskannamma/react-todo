import React from 'react'

function Edit({newTitle,newDescription,setTitle,setDescription,editTodo, setEdittodo}) {
  return (
    <div>
        <input value={newTitle} onClick={(e) => { setTitle(e.target.value) }} type="text" placeholder='Todo Name' required />
        <input value={newDescription} onClick={(e) => { setDescription(e.target.value) }} type="text" placeholder='Todo Description' required />
        <button className='bg bg-success'>Update</button>
    </div>
  )
}

export default Edit