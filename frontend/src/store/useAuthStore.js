import {create} from "zustand"


export const useAuthStore = create((set)=>({
    authUserState:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
}))