import {FaMagnifyingGlass} from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io';

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-transparent border border-gray-600 rounded-lg">
    <input 
    type="text"
    placeholder="Search Notes"
    className="w-full text-xs bg-transparent py-[11px] rounded-md outline-none"
    value={value}
    onChange={onChange}/>

    {value && (
        <IoMdClose
        className="text-xl text-slate-500 cursor-pointer hover:text-white mr-3"
        onClick={onClearSearch}/>
    )}
    <FaMagnifyingGlass
    className='text-slate-400 cursor-pointer hover:text-white'
    onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar