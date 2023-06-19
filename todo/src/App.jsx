import { useEffect, useState, } from "react";
import { db } from "./firebase/firebase.config";
import { collection, doc, addDoc, deleteDoc, serverTimestamp, getDocs, updateDoc } from "firebase/firestore";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [IsOpen, setIsOpen] = useState(false);

  const todosRef = collection(db, "todos");

  const handleNewTodo = async () => {
    const newTodo = {
      id: todos.length + 1,
      todo: todo,
      isDone: false,
      timeStamp: serverTimestamp()
    };
    await addDoc(todosRef, newTodo);
    setTodo('')
    window.location.reload();
  }

  useEffect(() => {
    const getTodo = async () => {
      let todoData = await getDocs(todosRef);
      setTodos(todoData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getTodo();
  }, []);

  const handleTodoEdit = async (id, newTodo) => {
    const todoDoc = doc(db, "todos", id);
    const updatedTodo = { todo: newTodo };
    await updateDoc(todoDoc, updatedTodo)
  }

  const handleTodoDelete = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    // window.location.reload();
  }

  const handleInputValue = (e) => {
    setTodo(e.target.value);
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }

  const handleEdit = () => {
    setIsOpen(true);
  }

  return (
    <div className=" w-full h-full flex items-center justify-center mt-10">
      <div className=" ">
        <div className=" text-2xl mb-2">Todo App</div>
        <div className=" flex">
          <input type="text" className=" border-black outline-none border-2 rounded w-72 mr-6" value={todo}
            onChange={handleInputValue}

          />
          <button onClick={handleNewTodo} className=" bg-green-900 text-white p-4 rounded">Add todo</button>
        </div>
        <ul className=" flex flex-col gap-3 mt-5">

          {
            todos.map((todo) => {
              return (
                <li key={todo.id} className=" flex justify-between gap-6 text-xl "><div>
                  {todo.todo}</div>
                  <div>
                    <span className=" border-2 border-blue-500 px-2 mr-2 bg-blue-500 rounded text-white text-base cursor-pointer" onClick={handleEdit}>Edit Todo</span>
                    <span className=" border-2 border-red-600 px-3 bg-red-600 rounded text-white text-base cursor-pointer" onClick={() => handleTodoDelete(todo.id)}>Delete</span>
                    
                  </div>
                  {IsOpen &&
                      <div>
                        <input className='border-2 border-indigo-900' value={newTodo} onChange={handleChange} />
                        <span className=" border-2 border-blue-500 px-2 mr-2 bg-green-500 rounded text-white text-base cursor-pointer" onClick={() => handleTodoEdit(todo.id)}>Update Todo</span>
                      </div>
                    }
                </li>
              )
            })
          }

        </ul>
      </div>
    </div>
  );
};

export default App;
