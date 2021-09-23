import { createContext } from 'react'
export const context = createContext(null);

export const initialState = {
    notification: {
        open: false,
        type: 'success',
        message: 'hola mundo',
        delay: 3000
    }
};