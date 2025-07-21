import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const navigate=useNavigate()
    const handleForm=async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        const input={
            username:username,
            password:password
        };
        try{
            const response=await fetch("https://todolist-fastapi-ga9v.onrender.com/login",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(input)
            });
            const data = await response.json();

            if(!response.ok){
                setError(data.detail);
            }
            else{  
                localStorage.setItem('token',data['access_token']);
                navigate("/user");
            }
        }
        catch{
            setLoading(false)
            setError("An error occurred")
        }
        finally{
            setLoading(false);
        }
        
    };
    const signin=()=>{
        navigate('/signup')
    }
  return (
    <>
    <div className='login-form'>
      <form onSubmit={handleForm}>
        <div className='login-username'>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div className='login-password'>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div className='login-error'>
             {error && <p>{error}  </p>}
        </div>
        <div className='login'>
            <button type='button' disabled={loading} onClick={handleForm}>{loading?"Logging in":"Login"}</button>
        </div>
       <div className='signup'>
            <button type='button' onClick={signin}>SignUp</button>
        </div>
      </form>
      </div>
       
    </>
    
  )
}

export default Login;
