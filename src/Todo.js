import React from 'react'

const Todo = ({todo,toggleTodo}) => {

  const handleTodoClick = () => {
    toggleTodo(todo.id);
  }


  return (
    <div>

      <label>
      <input type='checkbox' onChange={handleTodoClick}  checked={todo.completed} />
      {todo.name}

      </label>


    </div>
  )
}

export default Todo