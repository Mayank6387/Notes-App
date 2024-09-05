import { useState } from "react"
import { MdClose } from "react-icons/md";

const AddEditNotes = ({noteData,type,onClose}) => {

  const [content,setContent]=useState("");
  const [title,setTitle]=useState("");
  const [error,setError]=useState(null);

  const addNewNote=async()=>{}
  const editNote=async()=>{}

  const handleAddNote=()=>{

    if(!title){
      setError("Enter the title");
      return;
    }
    if(!content){
      setError("Enter the content")
      return;
    }
    if(type=="edit"){
      editNote();
    }else{
      addNewNote();
    }
    setError("");
  }

  return (
    <div className="relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-gray-600" onClick={onClose}>
        <MdClose className="text-xl text-white"/>
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input type="text"
        className='text-2xl  bg-transparent outline-none'
        placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}} />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea type="text"
        className='text-sm outline-none bg-transparent p-2 rounded-md'
        placeholder='Content'
        onChange={(e)=>{setContent(e.target.value)}}
        rows={10}>
        </textarea>
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button className='bg-blue-500 w-full text-sm my-1 font-medium mt-5 p-2 rounded-md' onClick={handleAddNote}>ADD</button>
    </div>
  )
}

export default AddEditNotes