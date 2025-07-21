import React,{useEffect, useState}from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './ToDoItem';
import './User.css'

function User() {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
   const navigate=useNavigate();
   const [todo,setTodo]=useState([]);
        useEffect(()=>{
            const verifyToken=async ()=>{
                const token=localStorage.getItem('token');
                console.log(token)
            try{
                const response=await fetch(`https://todolist-fastapi-ga9v.onrender.com/verify-token?token=${token}`);
                if(!response.ok){
                    throw new Error('Token verification failed');
                }
            }
            catch(error){
                localStorage.removeItem('token');
                navigate('/');
            }
        };
        verifyToken();
    },[navigate]);
    const get_todos=async ()=>{
            const token=localStorage.getItem('token');
            try{
                const response=await fetch(`https://todolist-fastapi-ga9v.onrender.com/todos?token=${token}`);
                if(!response.ok){
                    throw new Error('Token verification failed');
                }
                else{
                    const data=await response.json();
                    setTodo(data['todos']);
                }
            }
            catch(error){
                console.log("Error while fetching user todos");
            }
        };
    useEffect(()=>{
            get_todos();
    },[navigate]);
   const handleForm=async (e)=>{
        e.preventDefault();
        if(title==""){
            alert('Title cant be empty');
            return;
        }
        const token=localStorage.getItem('token');
        const input={
            title:title,
            desc:desc,
            checked:false
        }
        try{
            const res=await fetch(`https://todolist-fastapi-ga9v.onrender.com/add-todo?token=${token}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(input)
            });
            if(!res.ok){
                throw new Error("Error while adding Todo");
            }
            else{
                const data=await res.json();
                alert(data.message);
                setTitle("");
                setDesc("");
                get_todos();
            }
        }
        catch(error){
            console.log("Error while adding todo");
        }
   }
   const updateTodo = async (id, newChecked) => {
        const token = localStorage.getItem('token');
            try {
                const res = await fetch(`https://todolist-fastapi-ga9v.onrender.com/update-todo?token=${token}&todo_id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checked: newChecked })
                });

                if (!res.ok) {
                throw new Error("Failed to update todo");
                }

                const data = await res.json();
                console.log(data.message);
                get_todos(); 
            } catch (error) {
                console.log("Error while updating todo", error);
            }
    };
    const deleteTodo = async (id) => {

        const token = localStorage.getItem('token');
            try {
                const res = await fetch(`https://todolist-fastapi-ga9v.onrender.com/delete-todo?token=${token}&todo_id=${id}`, {
                method: 'DELETE'
                });

                if (!res.ok) {
                throw new Error("Failed to delete todo");
                }

                const data = await res.json();
                console.log(data.message);
                get_todos(); 
            } catch (error) {
                console.log("Error while deleting todo", error);
            }
    };
    const logout=()=>{
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate("/");
        }
    }

   
  return (
    <>
    <div className='user-container'>
        <form onSubmit={handleForm}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)}></input>
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
        <div className="logout-button">
        <button type="button" onClick={logout}>Logout</button>
    </div>
    </div>
     <div className="todo-list">
        {todo.slice().reverse().map((item) => (
            <TodoItem key={item.id} item={item} updateTodo={updateTodo} deleteTodo={deleteTodo} refetchTodos={get_todos} />
        ))}
    </div>
    
    </>
  )
}

export default User;
