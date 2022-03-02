import './App.css';
import TodoList from './TodoList';
import {useState,useRef,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todos, setTodos] = useState( []);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    setTodos(storedItems);
  },[]);


  useEffect(() => {

    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))

  },[todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);

  }


  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name !== '') 
    setTodos(prevTodos => {
      return [...prevTodos , {id:uuidv4(),name:name, completed:false}]
    })
    todoNameRef.current.value =null;
  }

  const handleClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type='text' />
      <button  onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearCompleted} >Clear Todo</button>
      <div> {todos.filter(todo => !todo.completed).length} left to do</div>
    </>
  );
}

export default App;
