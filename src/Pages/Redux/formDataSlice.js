// src/features/formDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {}
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        saveFormData: (state, action) => {
            state.formData = action.payload;
        },
        clearFormData: (state) => {
            state.formData = {};
        }
    }
});

export const { saveFormData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
