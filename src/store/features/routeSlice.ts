import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteState {
    intendedRoute: string | null;
}

const initialState: RouteState = {
    intendedRoute: null,
}

export const routeSlice = createSlice({
    initialState,
    name: 'routeSlice',
    reducers: {
        setIntended: (state, action: PayloadAction<string>) => {
            state.intendedRoute = action.payload;
        },
        fullfillIntended: (state) => {
            state.intendedRoute = null;
        },
    }
});

export const { setIntended, fullfillIntended } = routeSlice.actions;
export default routeSlice.reducer;