import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            "id": 1,
            "name": "hasan",
            "description": "this is test description 1"
        },
    ],
}

const userSlice = createSlice({

    name: "users",
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.users = [...state.users, { ...payload, id: state.users.length + 1 }];
        },

        modifyUser: (state, { payload }) => {
            console.log("from edit", payload)
            let userIndex = state.users.findIndex(user => user.id === payload.id)
            state.users[userIndex].name = payload.name
            state.users[userIndex].description = payload.description
        },

        deleteUser: (state, { payload }) => {
            state.users = state.users.filter(user => user.id !== payload)
        }
    },
});

export const { addUser, modifyUser, deleteUser } = userSlice.actions;
export const getAllUsers = (state) => state.users;
export default userSlice.reducer;