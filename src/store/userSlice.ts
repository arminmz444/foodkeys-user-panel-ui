// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the user's avatar
interface Avatar {
    fileName: string;
    filePath: string;
}

// Define the structure of the user's city and province
interface City {
    id: number;
    nameFa: string;
    nameEn: string;
}

interface Province {
    id: number;
    name: string;
}

// Define the structure of the user's accesses
interface Access {
    id: number;
    name: string;
}

// Define the structure of the UserState
interface UserState {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    username: string | null;
    phone: string | null;
    status: number | null;
    roles: string[];
    roleIds: number[] | null;
    accesses: Access[];
    accessIds: number[] | null;
    active: boolean;
    avatar: Avatar | null;
    lastLogin: string | null;
    lastLogout: string | null;
    address: string | null;
    cityId: number | null;
    provinceId: number | null;
    city: City | null;
    province: Province | null;
    postalCode: string | null;
    individualType: string | null;
    jobPosition: string | null;
    birthDate: string | null;
    pelak: string | null;
    nationalCode: string | null;
    shenasCode: string | null;
    profileIncomplete: boolean;
    online: boolean;
    token: string | null;
}

// Initial state
const initialState: UserState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    phone: null,
    status: null,
    roles: [],
    roleIds: null,
    accesses: [],
    accessIds: null,
    active: false,
    avatar: null,
    lastLogin: null,
    lastLogout: null,
    address: null,
    cityId: null,
    provinceId: null,
    city: null,
    province: null,
    postalCode: null,
    individualType: null,
    jobPosition: null,
    birthDate: null,
    pelak: null,
    nationalCode: null,
    shenasCode: null,
    profileIncomplete: false,
    online: false,
    token: null,
};

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer for logging in and setting the user data
        login: (state, action: PayloadAction<{ user: UserState; token: string }>) => {
            const { user, token } = action.payload;

            state.id = user.id;
            state.firstName = user.firstName;
            state.lastName = user.lastName;
            state.email = user.email;
            state.username = user.username;
            state.phone = user.phone;
            state.status = user.status;
            state.roles = user.roles;
            state.roleIds = user.roleIds;
            state.accesses = user.accesses;
            state.accessIds = user.accessIds;
            state.active = user.active;
            state.avatar = user.avatar;
            state.lastLogin = user.lastLogin;
            state.lastLogout = user.lastLogout;
            state.address = user.address;
            state.cityId = user.cityId;
            state.provinceId = user.provinceId;
            state.city = user.city;
            state.province = user.province;
            state.postalCode = user.postalCode;
            state.individualType = user.individualType;
            state.jobPosition = user.jobPosition;
            state.birthDate = user.birthDate;
            state.pelak = user.pelak;
            state.nationalCode = user.nationalCode;
            state.shenasCode = user.shenasCode;
            state.profileIncomplete = user.profileIncomplete;
            state.online = user.online;
            state.token = token;
        },
        // Reducer for logging out and resetting the user data
        logout: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// Export the actions
export const { login, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
