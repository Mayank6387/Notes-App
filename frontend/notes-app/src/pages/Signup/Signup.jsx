import { Link, useNavigate } from "react-router-dom"
import { PasswordInput } from "../../components/Input/PasswordInput"
import { useState } from "react"
import validateEmail from "../../utils/helper"
import axiosInstance from "../../utils/axiosInstance"
const Signup = () => {
  
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const navigate=useNavigate();
  const handleSignup=async(e)=>{
    e.preventDefault();

    if(!name){
      setError("Please enter name")
      return
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return
    }
    if(!password){
      setError("Please enter a valid password")
      return
    }

    setError("");

    //Signup API Call
    try{
      const response=await axiosInstance.post("/createaccount",{
        fullname:name,
        email:email,
        password:password
      })
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accesstoken) {
          localStorage.setItem("token", response.data.accesstoken);
          navigate("/dashboard");
        } else {
          console.log("No accessToken field found");
        }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error Occured.Please try again");
      }
    }
  }

  return (
  <>
  <div className="flex items-center justify-between px-6 py-2">
        <h2 className="text-xl font-medium text-white py-2">
            Notes
            <hr className="w-full mt-1 border-blue-500 my-4 border-t-2"/>
        </h2>
  </div>
  <div className="flex items-center justify-center mt-10">
    <div className="w-96 border border-gray-700 rounded px-7 py-10">
      <form onSubmit={handleSignup}>
        <h4 className="text-2xl mb-7 text-yellow-500">Signup</h4>

        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full text-sm bg-transparent  border-gray-700 border-[1px] px-5 py-3 rounded-md outline-none mb-4"/>

        <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full text-sm bg-transparent  border-gray-700 border-[1px] px-5 py-3 rounded-md outline-none mb-4"/>

        <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value) }></PasswordInput>
        
        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button type="submit" className="bg-blue-500 w-full text-sm p-2 rounded my-1 hover:bg-green-500">Login</button>

      <p className="text-sm text-center mt-4">Already have an account?{" "}
        <Link to="/login" className="font-medium text-purple-500 underline">
        Login</Link>
      </p>
      </form>
    </div>
  </div>
  </>
  )
}

export default Signup