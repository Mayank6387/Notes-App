import ProfileInfo from "./Cards/ProfileInfo"
import {useNavigate} from "react-router-dom"
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";

export const Navbar = ({onSearchNote,userInfo,clearSearch}) => {

  const [searchQuery,setSearchQuery]=useState("")
  const navigate=useNavigate();

  const onLogout=()=>{
    localStorage.clear();
    navigate("/login");
  }
  const handleSearch=()=>{
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }

  const onClearSearch=()=>{
    setSearchQuery("");
    clearSearch();
  }
  return (
    <div className="flex items-center justify-between px-6 py-2">
        <h2 className="text-xl font-medium text-white py-2">
            Notes
            <hr className="w-full mt-1 border-blue-500 my-4 border-t-2"/>
        </h2>
        <SearchBar value={searchQuery}
        onChange={(e)=>{
          setSearchQuery(e.target.value)
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}/>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}
