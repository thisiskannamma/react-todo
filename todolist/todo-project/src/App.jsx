import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [toDolist, setTodolist] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [toggle, settoggle] = useState(true)
  const [editId, setEditid] = useState(null);
  const addHandler = () => {

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    if (!newTitle || !newDescription) {
      alert('please fill in fields')
    }
    else if (newTitle && newDescription && !toggle) {
      setTodolist(toDolist.map((elem) => {
        if (elem.index === editId) {
          return { ...elem, title: newTitle,description:newDescription }
        }
        return elem;
      }))
      setTitle("")
      setDescription("");
    settoggle(true);
    setEditid(null);
    }
    else {
      let updatedTodoArr = [...toDolist];
      updatedTodoArr.push(newTodoItem);
      setTodolist(updatedTodoArr);
      localStorage.setItem("TODOLIST", JSON.stringify(updatedTodoArr));
      setTitle("");
      setDescription("");
    }

    // if (editId) {
    //   const edittodo = toDolist.find((i) => i.index !== editId);
    //   const updatedtodo = toDolist.map((t) => t.index !== edittodo.index ?
    //     (t = { index: t.index, newTitle })
    //     : { index: t.index, newTitle: t.newTitle }
    //   );
    //   setTodolist(updatedtodo);
    //   setEditid(0);
    //   setTitle("");
    //   return;
    // }



  };

  const deleteHandler = (index) => {
    let reducedlist = [...toDolist];
    reducedlist.splice(index, 1);

    localStorage.setItem("TODOLIST", JSON.stringify(reducedlist));
    setTodolist(reducedlist);
  }

  const editHandler = (index) => {
    debugger
    let findTitle = toDolist.find((list) => { return list.index === index });
    setTitle(findTitle.title);
    let findDescription = toDolist.find((list) =>{return list.index === index});
    setDescription(findDescription.description);
    settoggle(false)
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
        {toggle ? <button onClick={addHandler} className='bg bg-success'>Add to do</button> : <button onClick={addHandler} className='bg bg-success'>Update</button>}

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
        {toDolist.map((item) => {
          return (
            <div key={item.index} className="card">
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
                <button onClick={() => editHandler(item.index)} className='btn btn-success'>Edit</button>
                <button onClick={() => deleteHandler(item.index)} className='btn btn-danger'>Delete</button>
              </div>
            </div>)
        })}

      </div>

    </>
  )
}

export default App
