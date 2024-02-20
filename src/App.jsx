import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [button, setButton] = useState(1);

  function handleevent(event){
      const value = event.target.innerText;
      console.log(value);
      setButton(value);
  }
  return (
    <div>
      <button onClick={handleevent}>1</button>
      <button onClick={handleevent}>2</button>
      <button onClick={handleevent}>3</button>
      <button onClick={handleevent}>4</button>
      <Todo id={button} />
      {/* because of this change in the id ...dependency array need to be used  */}
    </div>
  )
}

function Todo({id}){
  const [todo, setTodo] = useState({});

  useEffect(()=>{
    console.log("reached useeffect");
    axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`)
      .then(async function(res){
        setTodo(res.data.todo);
      })
    // fetch(`https://sum-server.100xdevs.com/todo?id=${id}`)
    //   .then(async function(res){
    //     const json = await res.json();
    //     setTodo(json.todo);
    //   })

    //since id is not a state ..i feel we don't need to pass id as dependency.
    //but later when i introduced button ..there ids got changed ..So i need to introduce dependency
  },[id])

  return <div>
    Id:{id};
    <h1>
      {todo.title}
    </h1>
    <h2>
      {todo.description}
    </h2>
  </div>
}

export default App
