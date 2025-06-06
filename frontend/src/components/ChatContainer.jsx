import { useEffect, useRef } from "react";
import {useChatStore} from "../store/useChatStore.js"
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./Skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

export default function ChatContainer(){
    const {messages,getMessages,isMessagesLoading,selectedUser,listenToMessages,stopListeningToMessages}=useChatStore();
    const {authUser}= useAuthStore()

    const messageEndRef=useRef(null)
    useEffect(()=>{
        getMessages(selectedUser._id)

        listenToMessages();

        return ()=> stopListeningToMessages();
    },[selectedUser._id,getMessages,listenToMessages,stopListeningToMessages])

    useEffect(()=>{
        if(messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({behavior:"smooth"})
        }
    },[messages])


    if(isMessagesLoading)return(
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

    console.log(messages)

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message)=>{
                    return (
                        <div 
                            key={message._id}
                            className={`chat ${message.senderId === authUser._id ? "chat-end" :"chat-start"}`}
                            ref={messageEndRef}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img 
                                        src={message.senderId===authUser._id ? authUser.profilePic || "/Avatar-PNG.png":selectedUser.profilePic || "/Avatar-PNG.png"}
                                        alt="profile pic"
                                    />
                                </div>
                            </div>
                            <div className="chat-header mb-1" >
                                <time className="test-xs opcaity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                            <div className="chat-bubble flex flex-col" >
                                {message.image && (
                                    <img 
                                        src={message.image}
                                        alt="Attachement"
                                        className="sm:max-w-[200px] rounded-mb mb-2"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                                
                        </div>
                    )
                })}

            </div>
            <MessageInput />
        </div>
    )
}