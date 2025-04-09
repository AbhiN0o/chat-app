import { useChatStore } from "../store/useChatStore"
import {useAuthStore} from "../store/useAuthStore.js"
import {X} from "lucide-react"

export default function ChatHeader(){
    const {selectedUser,setSelectedUser}=useChatStore();
    const {onlineUsers}=useAuthStore()
    
    return(
        <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.profilePic || "/Avatar-PNG.png"} alt={selectedUser.fullName} />
                </div>
          </div>

        <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm test-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" :"Offline"}
            </p>
            </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
            <X />
        </button>
    </div>
    </div>
    )
}