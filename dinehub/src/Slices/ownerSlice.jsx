import { createSlice } from "@reduxjs/toolkit";



const OwnerSlice=createSlice({
    name:"owner",
    initialState:{
        owner:null
    },
    reducers:{
        setOwner(state,action){
          state.owner=action.payload
        }
    }

})

export const {setOwner} =OwnerSlice.actions

export default OwnerSlice.reducer