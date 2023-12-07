import { configureStore } from "@reduxjs/toolkit";
import TeamContext from "./Reducers/TeamContext";

const store = configureStore({
    reducer:{
          TeamContext:TeamContext.reducer
    }
})

export default store