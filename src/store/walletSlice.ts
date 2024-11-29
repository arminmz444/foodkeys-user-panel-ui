// src/store/walletSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
    credit: number;
}

const initialState: WalletState = {
    credit: 0,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        addCredit: (state, action: PayloadAction<number>) => {
            state.credit += action.payload;
        },
        setCredit: (state, action: PayloadAction<number>) => {
            state.credit = action.payload;
        },
        resetCredit: (state) => {
            state.credit = 0;
        },
    },
});

export const { addCredit, resetCredit, setCredit } = walletSlice.actions;
export default walletSlice.reducer;
