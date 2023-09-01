import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        contador: 0,
        cantidadTareas: 0,
        isLoading: false,
    },
    reducers: {
        startLoadingPokemons: (state, actions) => {
            state.isLoading = actions.payload.isLoading;
        }
    }
});


export const { startLoadingPokemons } = todoSlice.actions;