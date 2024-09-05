import NoteCard from "../../components/Cards/NoteCard"
import { Navbar } from "../../components/Navbar"
import {MdAdd} from "react-icons/md"
import AddEditNotes from "./AddEditNotes"
import { useState } from "react"
import ReactModal from "react-modal"

const Home = () => {
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown:false,
    type:"add",
    data:null
  })
  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
     <div className="grid grid-flow-col mt-4 gap-4 p-2">
       <NoteCard
      title="Meeting on 7"
      date="1 Apr,2025"
      content="Meeting on 7"
      isPinned={true}
      onEdit={()=>{}}
      onDelete={()=>{}}
      onPinNote={()=>{}}
      />
      <NoteCard
      title="Meeting on 7"
      date="1 Apr,2025"
      content="Meeting on 7"
      isPinned={true}
      onEdit={()=>{}}
      onDelete={()=>{}}
      onPinNote={()=>{}}
      />
      <NoteCard
      title="Meeting on 7"
      date="1 Apr,2025"
      content="Meeting on 7"
      isPinned={true}
      onEdit={()=>{}}
      onDelete={()=>{}}
      onPinNote={()=>{}}
      />
      </div>
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
    <AddEditNotes 
    type={openAddEditModal.type}
    noteData={openAddEditModal.data} onClose={()=>{setOpenAddEditModal({isShown:false,type:"add",data:null})}}></AddEditNotes>
    </ReactModal>
    </>
  )
}

export default Home