import React, { useEffect, useState } from "react";
import { logo } from "../assets";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbClipboardText } from "react-icons/tb";
import { onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { db, auth, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "../firebase";

function Todolist() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;
    
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
    
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTodos(todosList);
        });
    
        return () => unsubscribe(); 
    }, []);

    const addTodo = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        const user = auth.currentUser;
        if (!user) return;

        try {
            const docRef = await addDoc(collection(db, "todos"), {
                text,
                completed: false,
                userId: user.uid
            });
            setTodos([...todos, { id: docRef.id, text, completed: false, userId: user.uid }]);
            setText("");
        } catch (error) {
            console.log("Error adding task:", error);
        }
    };

    const toggleComplete = async (id, completed, userId) => {
        const user = auth.currentUser;
        if (!user || user.uid !== userId) return;
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, { completed: !completed });
            setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
        } catch (error) {
            console.log("Error updating task:", error);
        }
    };

    const removeTodo = async (id, userId) => {
        const user = auth.currentUser;
        if (!user || user.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "todos", id));
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    const countTasks = () => {
        const totalTasks = todos.length;
        const completedTasks = todos.filter(todo => todo.completed).length;
        return { totalTasks, completedTasks };
    };

    const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);
    const handleLogout = async () => {
        try {
            await signOut(auth);
           
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };
    

    return (
        <div className='text-center min-h-[120%] bg-[#191919]'>
         <div  onClick={handleLogout}  className="absolute top-[10px] right-[20px]  cursor-pointer text-white rounded-2xl bg-[#5E60CE] p-2"><PiSignOutBold fontSize={30} /></div> 
           <Link to="/todo">
                <div className='flex justify-center items-center gap-2 py-4 h-[200px] bg-[#0D0D0D]'>
                    <img className='h-[36px] w-[22px]' src={logo} alt="logo" />
                    <h1 className='text-[#4EA8DE] text-3xl font-bold' >
                        To<span className='text-[#5E60CE]'>do</span>
                    </h1>
                </div>    
            </Link>

            <div className='container min-h-[550px] mx-auto flex flex-col items-center relative'>
            
                <form onSubmit={addTodo} className='flex w-[90%] gap-2 justify-center absolute top-[-23px]'>
                    <input 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        className='w-full border-2 text-white outline-none border-[#0D0D0D] rounded-2xl bg-[#262626] pl-2 py-3 placeholder:text-[#808080]' 
                        placeholder='Add a new task' 
                        type="text" 
                    />
                    <button className='flex text-white text-lg gap-1 items-center py-2 px-3 rounded-xl bg-[#1E6F9F]' type="submit">
                        Create <IoIosAddCircleOutline className='flex text-white text-[18px]' />
                    </button>
                </form>

                <div className='w-[90%] flex justify-between items-center mt-10'>
                    <div>
                        <h1 className='flex items-center flex-wrap text-[#4EA8DE] text-lg px-2'>
                            Created tasks <p className='p-1 mx-2 px-3 rounded-3xl bg-[#333333] text-[#D9D9D9]'>{countTasks().totalTasks}</p>
                        </h1>
                    </div>
                    <div>
                        <h1 className='flex items-center flex-wrap justify-end text-[#5E60CE] text-lg px-2'>
                            Completed <p className='p-1 mx-2 px-3 rounded-3xl bg-[#333333] text-[#D9D9D9]'>{countTasks().completedTasks} of {countTasks().totalTasks}</p>
                        </h1>
                    </div>
                </div>

                <hr className='w-[90%] mt-4' />

                {todos.length === 0 ? (
                    <div className='flex items-center flex-col my-10'>
                        <TbClipboardText className='text-[150px] my-4' color="#3D3D3D" />
                        <h1 className='text-[#808080] text-[16px] py-2 font-bold'>You don't have any tasks registered yet.</h1>
                        <h2 className='text-[#808080] text-[16px] pb-2 font-normal'>Create tasks and organize your to-do items.</h2>
                    </div>
                ) : (
                    <ul className='w-[90%] my-4'>
                        {sortedTodos.map(todo => (
                            <li key={todo.id} className='flex py-4 justify-between items-center bg-[#262626] p-4 my-2 rounded-lg'>
                                <div>
                                    <span 
                                        onClick={() => toggleComplete(todo.id, todo.completed, todo.userId)} 
                                        className={`cursor-pointer p-0.5 px-2.5 mr-2 text-transparent border-[#4EA8DE] rounded-full border-2 ${todo.completed ? "bg-[#5E60CE] border-[#5E60CE]" : "bg-transparent"}`}
                                    >
                                        .
                                    </span>
                                    <span className={`cursor-pointer px-2 py-2 w-full break-all ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                        {todo.text}
                                    </span>
                                </div>
                                <button onClick={() => removeTodo(todo.id, todo.userId)} className='text-red-500 mx-2'>
                                    <RiDeleteBinLine fontSize={25} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Todolist;
