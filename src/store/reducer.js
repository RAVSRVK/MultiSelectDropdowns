/* eslint-disable default-case */
import { createSlice } from "@reduxjs/toolkit";
import { mockData } from '../mocks/mock'
import { impkeys } from "../utils/constants";

const userSelectedOptions = {
    category: [],
    brand: [],
    color: [],
    price: [],
    name: []
}

const initialDisabledState = {
    category: false,
    brand: true,
    color: true,
    price: true,
    name: true
}

const initialState = {
    selectedOptions: userSelectedOptions,
    disabledOptions: initialDisabledState,
    availableData: mockData
}

export const multiSelectDropdowns = createSlice({
    name: 'MultiSelectDropdpown',
    initialState: initialState,
    reducers: {
        updateOptions: (state, action) => {
            const { impkey, selectedValues } = action.payload;
            if(selectedValues.length !==0 ||(selectedValues.length ===0 && state.selectedOptions[impkey].length!==0) ){
                state.selectedOptions[impkey] = selectedValues
                switch (impkey) {
                    case impkeys.category:
                        state.selectedOptions.brand = []
                        state.selectedOptions.color = []
                        state.selectedOptions.name = []
                        state.selectedOptions.price=[]
                        state.disabledOptions.brand = false
                        state.disabledOptions.color = true
                        state.disabledOptions.name = true
                        state.disabledOptions.price = true
                        break;
                    case impkeys.brand:
                        state.selectedOptions.color = []
                        state.selectedOptions.name = []
                        state.selectedOptions.price=[]
                        state.disabledOptions.color = false
                        state.disabledOptions.name = true
                        state.disabledOptions.price = true
                        break;
                    case impkeys.color:
                        state.selectedOptions.name = []
                        state.selectedOptions.price=[]
                        state.disabledOptions.price = false
                        state.disabledOptions.name = true
                        break;
                    case impkeys.price:
                        state.selectedOptions.name=[]
                        state.disabledOptions.name = false
                        break;
                }
            }
        }
    }
});

export const {
    updateOptions } = multiSelectDropdowns.actions
export default multiSelectDropdowns.reducer;
