import { Link } from "react-router-dom"
import { Navbar } from "../../components/Navbar"
import { PasswordInput } from "../../components/Input/PasswordInput"
import { useState } from "react"
import validateEmail from "../../utils/helper"
const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);

  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    if(!password){
      setError("Please enter a valid password")
      return
    }

    setError("");

    //Login API Call
  }

  return (
  <>
  <Navbar/>
  <div className="flex items-center justify-center mt-10">
    <div className="w-96 border border-gray-700 rounded px-7 py-10">
      <form onSubmit={handleLogin}>
        <h4 className="text-2xl mb-7">Login</h4>

        
        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full text-sm bg-transparent  border-gray-700 border-[1px] px-5 py-3 rounded-md outline-none mb-4"/>

        <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value) }></PasswordInput>
        
        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button type="submit" className="bg-blue-500 w-full text-sm p-2 rounded my-1 hover:bg-green-500">Login</button>

      <p className="text-sm text-center mt-4">Not registered yet?{" "}
        <Link to="/signup" className="font-medium text-green-500 underline">
        Create an Account</Link>
      </p>
      </form>
    </div>
  </div>
  </>
  )
}

export default Login