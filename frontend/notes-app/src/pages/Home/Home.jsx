import NoteCard from "../../components/Cards/NoteCard"
import { Navbar } from "../../components/Navbar"
import {MdAdd} from "react-icons/md"
import AddEditNotes from "./AddEditNotes"
import { useEffect, useState } from "react"
import ReactModal from "react-modal"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"

const Home = () => {
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null
  })

  const [userInfo,setUserInfo]=useState(null);
  const [getNotes, setGetNotes] = useState([])
  const [isSearch,setIsSearch]=useState(false);
  const navigate=useNavigate();
  
  const handleEdit=(noteDetails)=>{
    setOpenAddEditModal({
      isShown:true,
      data:noteDetails,
      type:"edit"
    })
  }

 const getUserInfo=async()=>{
  try {
    const response=await axiosInstance.get("/get-user");
    if(response.data && response.data.user){
      setUserInfo(response.data.user)
    }
  } catch (error) {
    if(error.message.status===401){
      localStorage.clear();
      navigate("/login")
    }
 }
}

const getAllNotes=async()=>{
  try {
    const response=await axiosInstance.get("/get-all-notes");
    if(response.data && response.data.notes){
      setGetNotes(response.data.notes)
    }
    
  } catch (error) {
    console.log("An unexpexted error occurred",error)
  }
}


const deleteNote=async(data)=>{
  const noteid=data._id;
  try {
    const response=await axiosInstance.delete('/delete-note/'+ noteid)
    if(response.data && !response.data.error){
      getAllNotes();
    }
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message){
      console.log("An unexpected error occurred",error)
    }
  }
}

const onSearchNote=async(query)=>{
  try {
    const response=await axiosInstance.get('/search-note',{
      params:{query}
    })
    if(response.data && response.data.notes){
      setIsSearch(true);
      setGetNotes(response.data.notes)
    }
  } catch (error) {
    console.log(error)
  }
}

const updateIsPinned=async(noteData)=>{
  const noteid=noteData._id;
    try {
      const response=await axiosInstance.put('/update-note-pinned/'+ noteid,{
        isPinned:!noteData.isPinned,
    })
      if(response.data && response.data.note){
        getAllNotes();
       
      }
    } catch (error) {
      console.log(error)
    }
}

const clearSearch=()=>{
  setIsSearch(false);
  getAllNotes();
}
useEffect(() => {
  getUserInfo();
  getAllNotes();
},[])

  return (
    <>
    <Navbar userInfo={userInfo} onSearchNote={onSearchNote} clearSearch={clearSearch}/>
    <div className="container mx-auto">
     {getNotes.length>0?<div className="grid grid-flow-col mt-4 gap-4 p-2">
      {getNotes.map((item,index)=>(
        <NoteCard key={item._id}
        title={item.title}
        date={item.createdOn}
        content={item.content}
        isPinned={item.isPinned}
        onEdit={()=>{handleEdit(item)}}
        onDelete={()=>{deleteNote(item)}}
        onPinNote={()=>{updateIsPinned(item)}}
        />
      ))}
    </div>:<div className="text-center top-1/2">
      <p className="mt-52">
        Start creating your first note!Click the <span className="text-green-500">'ADD'</span> button to jot down your thoughts,ideas and reminders.<span className="text-blue-500">Let's Get Started</span>
      </p>
      </div>}
    </div>
    <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-green-500 absolute right-10 bottom-10" onClick={()=>{setOpenAddEditModal({isShown:true,type:"add",data:null})}}>
      <MdAdd className="text-[32px] text-white"/>
    </button>

    <ReactModal
       isOpen={openAddEditModal.isShown}
       onRequestClose={()=>{}}
       style={{
        overlay:{
          backgroundColor:"rgb(0,0,0,0,2)",
        },
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-gray-700 rounded-md mx-auto mt-14 p-5">
    <AddEditNotes getAllNotes={getAllNotes}
    type={openAddEditModal.type}
    noteData={openAddEditModal.data} onClose={()=>{setOpenAddEditModal({isShown:false,type:"add",data:null})}}></AddEditNotes>
    </ReactModal>
    </>
  )
}

export default Home