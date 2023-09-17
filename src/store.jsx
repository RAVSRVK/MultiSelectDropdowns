import { configureStore } from "@reduxjs/toolkit";
import { multiSelectDropdowns } from "./store/reducer";

const store = configureStore({
    reducer: {
        multiSelectDropdowns: multiSelectDropdowns.reducer
    }
})

export default store