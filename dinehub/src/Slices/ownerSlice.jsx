import { createSlice } from "@reduxjs/toolkit";



const OwnerSlice=createSlice({
    name:"owner",
    initialState:{
        owner:null
    },
    reducers:{
        setOwner(state,action){
          state.owner=action.payload
        },
        ownerLogout(state,acion){
            state.owner=null
        }

    }

})

export const {setOwner,ownerLogout} =OwnerSlice.actions

export default OwnerSlice.reducer