// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
// import studentReducer from '../reducers/studentReducer';
import studentReducer from '../reducer/studentReducer';
// Impor reducer lainnya jika ada

const store = configureStore({
    reducer: {
        student: studentReducer,
        // Tambahkan reducer lain di sini jika perlu
    },
});

export default store;
