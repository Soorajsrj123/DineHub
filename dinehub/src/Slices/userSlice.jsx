import { createSlice } from "@reduxjs/toolkit"


const userauthSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        logIn(state,action){
           state.user=action.payload
        },
        logOut(state){
            state.user=null
        }
    }
})

// const reducer=combineReducers({
//     user:userReducer
// })
export const {logIn,logOut }=userauthSlice.actions

export default userauthSlice.reducer
