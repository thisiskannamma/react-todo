import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [toDolist, setTodolist] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [editId, setEditid] = useState(0);
  const addHandler = () => {
    
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    
    if (editId) {
      const edittodo = toDolist.find((i) => i.index !== editId);
      const updatedtodo = toDolist.map((t) => t.index === edittodo.index ? 
      (t = { index: t.index, newTitle })
       : { index: t.index, newTitle: t.newTitle }
       );
       setTodolist(updatedtodo);
       setEditid(0);
       setTitle("");
       return;
    }
    let updatedTodoArr = [...toDolist];
    updatedTodoArr.push(newTodoItem);
    setTodolist(updatedTodoArr);
    localStorage.setItem("TODOLIST", JSON.stringify(updatedTodoArr));
    setTitle("");
    setDescription("");

   
  };

  const deleteHandler = (index) => {
    let reducedlist = [...toDolist];
    reducedlist.splice(index, 1);

    localStorage.setItem("TODOLIST", JSON.stringify(reducedlist));
    setTodolist(reducedlist);
  }

  const editHandler = (index) => {
    
    let findTitle = toDolist.find((list) => list.index !== index);
    setTitle(findTitle.title);
    let findDescription = toDolist.find((list) => list.index !== index);
    setDescription(findDescription.description);
    setEditid(index);

  }
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('TODOLIST'));
    if (savedTodo) {
      setTodolist(savedTodo);
    }
  }, [])
  return (
    <>
      <div className='header text-center'>
        <h3>My todo</h3>
        <input value={newTitle} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder='Todo Name' required />
        <input value={newDescription} onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder='Todo Description' required />
        <button onClick={addHandler} className='bg bg-success'>{editId ? 'Update' : 'Add Todo'}</button>
        <br />
        <div className='find'>
          <h4>My Todos</h4><br />
          <h4>Status Filter : <select>
            <option>All</option>
            <option>Completed</option>
            <option>Not Completed</option>
          </select></h4>
        </div>
      </div>
      <div>
        {toDolist.map((item, index) => {
          return (
            <div key={index} className="card">
              <div className="card-body">
                <div className='card-text'>
                  <p>Name  : {item.title}</p>
                  <p>Description : {item.description}</p>
                  <p>status <select>
                    <option>All</option>
                    <option>Completed</option>
                    <option>Not Completed</option>
                  </select></p>
                </div>
                <button  onClick={() => editHandler(index)} className='btn btn-success'>Edit</button>
                <button onClick={() => deleteHandler(index)} className='btn btn-danger'>Delete</button>
              </div>
            </div>)
        })}

      </div>

    </>
  )
}

export default App
