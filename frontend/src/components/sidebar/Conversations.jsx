import { useAuthContext } from "../../context/AuthContext"
import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
  const{loading, conversations} =useGetConversations()
  
  const {authUser}=useAuthContext();
  const filterConversations=conversations.filter((conversation)=>conversation._id!==authUser._id);

  return (
    <div className="py-2 flex flex-col overflow-auto">
        {filterConversations.map((conversation,idx)=>(
          <Conversation 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx===conversation.length-1}
          />
        ))}
        {loading ? <span className="loading loading-spinner mx-auto"></span>: null}
    </div>
  )
}

export default Conversations
