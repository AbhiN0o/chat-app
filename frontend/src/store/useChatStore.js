import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null, 
    isUsersLoading:false,
    isMessagesLoading:false,


    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get("messages/users");
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading:false})
        }
    },




    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },
    
    sendMessages:async(messageData)=>{
        const {selectedUser,messages}=get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    listenToMessages: ()=>{
        const {selectedUser}=get();
        if(!selectedUser)return;

        const socket = useAuthStore.getState().socket


        socket.on("newMessage",(newMessage)=>{
            //jo user select kia hai usko display karna na socket coz when we send the sender is okay , usak wahi update hus but the receiver has to get the result tha is why the selcted user ,thatis recevier is thats id now equalto message.senderID tah mean thhe messwaw was not for lselected suer, think this in context fo teh person receiging , it has selected teh sender ,t aht is who'll send the message , so its , that is th emessge sender id shoudl be eqlt o slec teduse id
            const isMessageSentFromSelectedUser= newMessage.senderId===selectedUser._id
            if(!isMessageSentFromSelectedUser)return;
            console.log(newMessage)
            console.log(selectedUser)
            set({messages:[...get().messages,newMessage]})
        })
    },

    stopListeningToMessages:()=>{
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser:(selectedUser)=>{
        set({selectedUser})
    },




}))