import { useState } from "react"
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'


export const PasswordInput = ({value,onChange,placeholder}) => {
    
  
  const [isShowPassword,setIsShowPassword]=useState(false);

    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowPassword);
    }
  return (
    <div className="flex items-center bg-transparent border-[1px] px-5 rounded mb-4 border-gray-700">
        <input 
        value={value}
        onChange={onChange}
        type={isShowPassword?"text":"password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"/>
        {isShowPassword?(
            <FaRegEye
                size={22}
                className="text-blue-500 cursor-pointer"
                onClick={()=>toggleShowPassword()}/>
        ):(
                <FaRegEyeSlash
                size={22}
                 className="text-blue-500 cursor-pointer"
                onClick={()=>toggleShowPassword()}/>
        )
         }
    </div>
  )
}
