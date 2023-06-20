import { useEffect, useState, } from "react";
import Todo from "./components/Todo";
import { db } from "./.env/firebase.config";
import { collection, doc, addDoc, deleteDoc, serverTimestamp, getDocs, updateDoc } from "firebase/firestore";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const todosRef = collection(db, "todos");

  const handleNewTodo = async () => {
    const newTodo = {
      id: todos.length + 1,
      todo: todo,
      isDone: false,
      timeStamp: serverTimestamp()
    };
    if(todo === "") return;
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

  const handleEdit = async ( todo, newTodo) => {
    const todoDoc = doc(db, "todos", todo.id);
    const updatedTodo = { todo: newTodo };
    await updateDoc(todoDoc, updatedTodo);
  }

  const handleDelete = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc); 
    window.location.reload();
  }


  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  return (
    <div className=" w-full h-full flex items-center justify-center mt-10">
      <div className=" ">
        <div className=" text-2xl mb-2">Todo App</div>
        <div className=" flex">
          <input type="text" className=" border-black outline-none border-2 rounded w-72 mr-6" value={todo}
            onChange={handleChange}

          />
          <button onClick={handleNewTodo} className=" bg-green-900 text-white p-4 rounded hover:opacity-80">Add todo</button>
        </div>
        <div className=" flex flex-col gap-3 mt-5">
          {
            todos.map((todo) => {
              return (
                <Todo key={todo.id} todo={todo} handleEdit={handleEdit} handleDelete={handleDelete}/>
              )
            })
          }

        </div>
      </div>
    </div>
  );
};

export default App;
