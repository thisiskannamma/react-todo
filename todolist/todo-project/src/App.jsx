import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const option = ["All", "Completed", "Not completed"];


  const [toDolist, setTodolist] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newStatus, setStatus] = useState("")
  const [completedTodo, setCompletedTodo] = useState([])
  const [notCompletedTodo, setNotCompletedTodo] = useState([])

  const [toggle, settoggle] = useState(true)
  const [editId, setEditid] = useState(null);

  const addHandler = () => {

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      status: option[2]

    }
    if (!newTitle || !newDescription) {
      alert('please fill in fields')
    }
    else if (newTitle && newDescription && !toggle) {
      setTodolist(toDolist.map((elem, index) => {
        if (index === editId) {
          return { ...elem, title: newTitle, description: newDescription }
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
    // if (editId !=null) {
    //   const edittodo = toDolist.find((i,idx) => idx === editId);
    //   console.log(edittodo);

    //   const updatedtodo=toDolist.map((item,index)=>index === editId?
    //   ({ ...item, title: newTitle, description: newDescription })
    //   :({...item}))
    //   console.log(updatedtodo);


    //   // const updatedtodo = toDolist.map((t) => t.index !== edittodo.index ?
    //   //   (t = { index: t.index, newTitle })
    //   //   : { index: t.index, newTitle: t.newTitle }
    //   // );
    //   setTodolist(updatedtodo);
    //   setEditid();
    //   setTitle("");
    //   // return;
    // }




  };

  const deleteHandler = (index) => {

    let reducedlist = [...toDolist];
    reducedlist.splice(index, 1);

    localStorage.setItem("TODOLIST", JSON.stringify(reducedlist));
    setTodolist(reducedlist);
  }

  const editHandler = (index) => {

    let findTitle = toDolist.find((list, ind) => { return ind === index });
    setTitle(findTitle.title);

    let findDescription = toDolist.find((list, ind) => { return ind === index });
    setDescription(findDescription.description);
    settoggle(false)
    setEditid(index);


  }

  const editStatus = (index, e) => {

console.log(e.target.value);

    setTodolist(toDolist.map((elem, ind) => {
      if (index == ind) {
        return { ...elem, status: e.target.value }
      }
      return elem;
    }))
    // setStatus(option[2])
    console.log(toDolist);

    localStorage.setItem("TODOLIST", JSON.stringify(toDolist));



  }
  console.log(toDolist);
  console.log(completedTodo);

  const filterStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value)
    if (e.target.value === option[1]) {
      let filterCompleted = toDolist.filter((item) => item.status === option[1])
      setCompletedTodo(filterCompleted)
      console.log(filterCompleted);


    }
    else if (e.target.value === option[2]) {
      let filterNotCompleted = toDolist.filter((item) => item.status === option[2])
      setNotCompletedTodo(filterNotCompleted)
      console.log(filterNotCompleted);

    }
    else {
      setTodolist(toDolist)

    }

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
          <h4>Status Filter : <select onChange={(e) => filterStatus(e)} >
            {option.map((op, index) => (<option key={index} value={op}>{op}</option>))}

          </select></h4>
        </div>
      </div>
      {newStatus === option[1] ? <><div>
        {completedTodo.map((item, index) => {
          return (
            <div key={index}  className="card">
              <div className="card-body">
                <div className='card-text'>
                  <p>Name  : {item.title}</p>
                  <p>Description : {item.description}</p>
                  <p>status <select onChange={(e) => editStatus(index, e)} >
                    <option value={option[2]} >{option[2]}</option>
                    <option value={option[1]} >{option[1]}</option>
                  </select></p>
                </div>
                <button onClick={() => editHandler(index)} className='btn btn-success'>Edit</button>
                <button onClick={() => deleteHandler(index)} className='btn btn-danger'>Delete</button>
              </div>
            </div>)
        })}

      </div></> : <>
        {newStatus === option[2] ? <><div>
          {notCompletedTodo.map((item, index) => {
            return (
              <div key={index}  className="card">
                <div className="card-body">
                  <div className='card-text'>
                    <p>Name  : {item.title}</p>
                    <p>Description : {item.description}</p>
                    <p>status <select onChange={(e) => editStatus(index, e)} >
                      <option value={option[2]} >{option[2]}</option>
                      <option value={option[1]} >{option[1]}</option>
                    </select></p>
                  </div>
                  <button onClick={() => editHandler(index)} className='btn btn-success'>Edit</button>
                  <button onClick={() => deleteHandler(index)} className='btn btn-danger'>Delete</button>
                </div>
              </div>)
          })}

        </div></> : <><div>
          {toDolist.map((item, index) => {
            return (
              <div key={index} style={{ display: "flex" }} className="card">
                <div className="card-body">
                  <div className='card-text'>
                    <p>Name  : {item.title}</p>
                    <p>Description : {item.description}</p>
                    <p>status <select onChange={(e) => editStatus(index, e)} >
                      <option value={option[2]} >{option[2]}</option>
                      <option value={option[1]} >{option[1]}</option>
                    </select></p>
                  </div>
                  <button onClick={() => editHandler(index)} className='btn btn-success'>Edit</button>
                  <button onClick={() => deleteHandler(index)} className='btn btn-danger'>Delete</button>
                </div>
              </div>)
          })}

        </div></>}</>}




    </>
  )
}

export default App
