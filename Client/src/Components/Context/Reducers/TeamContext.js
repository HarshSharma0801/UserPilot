import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    members:[],
    Total:0,
    error:false
}
const TeamContext = createSlice({
    name:'Team',
    initialState:initialState,
    reducers:{
        SetInitial(state){
          state.members = [];
          state.Total=0,
          state.error=false

        },
                AddtoTeam(state,action){
              
            const newMember = action.payload;
            const ExistingMember = state.members.find(member=> member.id===newMember.id);
            const ExistingDomain = state.members.find(member=> member.domain===newMember.domain);
            if(!ExistingDomain && !ExistingMember){
                state.Total++ ;
                state.members.push({
                    id:newMember.id,
                    avatar:newMember.avatar,
                    firstName:newMember.firstName,
                    lastName:newMember.lastName,
                    gender:newMember.gender,
                    domain:newMember.domain
                })
            }
            else{
                state.error = !state.error;

            }
                
           
        },
        Seterror(state){
            state.error = false;

        },
        RemoveFomTeam(state,action){
            const memberId = action.payload;
            state.members = state.members.filter(member=>member.id !== memberId.id); 
            state.Total--;
                }
      
    }
})


export const TeamActions = TeamContext.actions;


export default TeamContext