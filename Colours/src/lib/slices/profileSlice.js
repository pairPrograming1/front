import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  auth0User: null,
  isAuthenticated: false,
  rol: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.auth0User = action.payload.auth0User;
      state.isAuthenticated = true;
      state.rol = action.payload.user?.rol || null;
    },
    clearUserData: (state) => {
      state.user = null;
      state.auth0User = null;
      state.isAuthenticated = false;
      state.rol = null;
    }
  }
});

export const { setUserData, clearUserData } = profileSlice.actions;

// Selectores para acceder fácilmente a los datos
export const selectUser = (state) => state.profile.user;
export const selectUserId = (state) => state.profile.user?.id;
export const selectIsAuthenticated = (state) => state.profile.isAuthenticated;
export const selectRol = (state) => state.profile.rol;
export const selectAuth0User = (state) => state.profile.auth0User;

export default profileSlice.reducer;