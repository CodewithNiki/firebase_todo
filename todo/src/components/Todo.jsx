/* eslint-disable react/prop-types */
import { useState } from "react"

const Todo = ({todo, handleDelete, handleEdit}) => {
    const [newTodo, setNewTodo] = useState(todo.todo);
    const [updated, setUpdated] = useState(false)
    const handleChange = (e)=>{
        e.preventDefault();
        setNewTodo(e.target.value)
    }
  return (
    <div>
        <input value={todo.todo && newTodo } onChange={handleChange} className=" py-1"/>
        <button className=" border-2 border-blue-600 bg-blue-600 text-white mx-3 px-3 py-1 hover:opacity-80" 
        onClick={()=> handleEdit(todo, newTodo)} >Update
        </button>
        <button className=" border-2 border-red-600 bg-red-600 text-white px-3 py-1 hover:opacity-80"
        onClick={()=> {handleDelete(todo.id), setUpdated(true)}}>Delete
        {updated && <div className=" text-green-500 text-sm">Updated</div>}
        </button>
    </div>
  )
}

export default Todo