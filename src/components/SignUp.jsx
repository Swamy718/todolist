import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';


import './Signup.css';
function SignUp() {
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[repassword,setRepassword]=useState("")
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")
    const navigate=useNavigate()
    const handleForm=async (e)=>{
        e.preventDefault();
        if (username=="" || password==""){
            setError("Enter all Details");
            return;
        }
        if (password!=repassword){
            setError("Password mismatched");
            return;
        }
        setError("");
        setLoading(true);
        const input={
            username:username,
            password:password
        };
        try{
            const response=await fetch("https://todolist-fastapi-ga9v.onrender.com/register",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(input)
            });
            const data = await response.json();

            if(!response.ok){
                setError(data.detail);
            }
            else{  
                alert("User Created Successfully");
                navigate("/")
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
  return (
    <div className='signup-form'>
      <form onSubmit={handleForm}>
        <div className='signup-username'>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div className='signup-password'>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div className='signup-repassword'>
            <label>Confirm Password:</label>
            <input type="password" value={repassword} onChange={(e)=>setRepassword(e.target.value)}></input>
        </div>
         <div className="signup-error">
            {error && <p>{error}  </p>}
        </div>
        <div className='signup-button'>
            <button type='submit' disabled={loading}> {loading ? "Signing up..." : "Sign Up"}</button>
        </div>
       
      </form>
      <div className="tologin">
         <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
     
    </div>
  )
}

export default SignUp;
