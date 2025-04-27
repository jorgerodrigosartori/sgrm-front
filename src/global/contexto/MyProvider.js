import React, { useReducer } from 'react';
import { MyContext } from './MyContext';
import { initialState, reducer } from "../../global/Reducer/ProcessoReducer";

export const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};