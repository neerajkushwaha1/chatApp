import { useAuthContext } from "../../context/AuthContext.jsx";

import useConversation from "../../zustand/useConversation.js";

const Message = ({message}) => {
    const {authUser}=useAuthContext();
    const {selectedConversation}=useConversation();
    const fromMe = message.senderId === authUser._id;

    const chatClassName =  fromMe ? 'chat-end':"chat-start";
    
    const profilePic = fromMe ? authUser.profilePic :selectedConversation?.profilePic;

    const bubbleBgColor= fromMe ? "bg-indigo-700":"bg-gray-700";

    const shakeClass=message.shouldShake ?"shake":"";

    return (
        <div className={`text-white chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt=" avatar" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>

            <div className="chat-footer text-xs opacity-50 flex gap-1 items-center">{extractTime(message.createdAt)}</div>
        </div>
    )
}

export default Message


function extractTime(dateString) {  
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours) % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${padZero(formattedHours)}:${padZero(formattedMinutes)} ${ampm}`;
    }

    function padZero(num) { 
        return num < 10 && num >0? `0${num}` : num;
    }
