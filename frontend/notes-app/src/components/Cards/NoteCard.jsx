import { MdOutlinePushPin } from "react-icons/md";


import { MdCreate,MdDelete } from "react-icons/md"
const NoteCard = ({
    title,
    date,
    content,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
  return (
    <div className="border border-gray-700 rounded p-4 bg-transparent hover:shadow-xl transition-all ease-in-out mt-4">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{date}</span>
            </div>

            <MdOutlinePushPin className={`text-xl text-slate-300 cursor-pointer hover:text-blue-500 ${isPinned?'text-blue-500':'text-gray-500'}`}
            onClick={onPinNote}/>
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
                <MdCreate
                className=" hover:text-green-600"
                onClick={onEdit}/>
                <MdDelete
                className="text-xl text-slate-300 cursor-pointer  hover:text-red-500"
                onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NoteCard