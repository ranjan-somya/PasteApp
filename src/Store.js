import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './redux/Pastefile.js'
// import { paste } from '@testing-library/user-event/dist/paste.js'
export const store = configureStore({
    
    reducer: {
    paste: PasteReducer,
  },
})