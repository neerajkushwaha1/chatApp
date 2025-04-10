import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation"

const Conversation = ({conversation, lastIdx, emoji}) => {

    const{selectedConversation, setSelectedConversation}=useConversation()
    const isSelected=selectedConversation?._id=== conversation._id;

    console.log("Conversation Id: ", conversation._id)
    const {onlineUsers}=useSocketContext()
    console.log("Online Users: ",onlineUsers)
    const isOnline=onlineUsers.includes(conversation._id)
    console.log("Is Online: ",isOnline)

    return (
        <>
        <div className={`flex gap-2 items-center hover:bg-gray-500 rounded p-2 py-1 cursor-pointer 
            ${isSelected ? "bg-indigo-500":""}`} onClick={() => (setSelectedConversation(conversation))}>
            <div className={`avatar ${isOnline ? "online":""}`}>
                <div className="w-10 rounded-full">
                    <img src={conversation.profilePic} />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className="font-bold text-gray-200">{conversation.fullName}</p>
                <span className="text-xl">{emoji}</span>
            </div>
        </div>
        {!lastIdx && <div className="divider my-0 py-0" />}
        </>
    )
}

export default Conversation
