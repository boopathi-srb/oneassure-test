import { createSlice } from '@reduxjs/toolkit';
import bcrypt from 'bcryptjs'

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    signUp: (state, action) => {
      state.currentUser = { email: action.payload.email, password: action.payload.password, userName:action.payload.userName, signedIn:false};
      if(action.payload.remember){
        localStorage.setItem("user", JSON.stringify({ email: action.payload.email, password: action.payload.password, userName:action.payload.userName, signedIn:false}))
      }
      else{
        localStorage.setItem("user",null)
      }
    },
    signIn: (state, action) => {
      const { email, password } = action.payload;
      const hashedPassword = hashFunction(password); 
      if (state.currentUser && state.currentUser.email === email && state.currentUser.password === hashedPassword) {
        console.log('User signed in successfully');
        state.currentUser.signedIn=true;
      } else {
        console.log('Sign-in failed');
        state.currentUser.signedIn=false;
      }
    },
    signOut: (state) => {
      state.currentUser.signedIn=false;
    },
  },
});

export const { signUp, signIn, signOut } = userSlice.actions;
export default userSlice.reducer;

function hashFunction(password) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    return hash;
});
}
