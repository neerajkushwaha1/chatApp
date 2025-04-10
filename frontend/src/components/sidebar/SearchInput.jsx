import {IoSearchSharp} from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'
import { useState } from 'react'
const SearchInput = () => {

  const[search, setSearch]=useState('')
  const {setSelectedConversation}=useConversation()
  const {conversations}=useGetConversations()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!search) return;
    if(search.length<3) {
      toast.error('Search term must be at least 3 characters')
    }
    const conversation=conversations.find(c=>c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      console.log(conversation)
      setSelectedConversation(conversation)
      setSearch('')
    }
    else{
      toast.error('No such user found')
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}> 
        <input type="text" placeholder="Search..." className="input input-bordered w-full" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button type='submit' className="btn btn-circle bg-indigo-500 text-white" >
            <IoSearchSharp/>
        </button>
    </form>
  )
}

export default SearchInput
