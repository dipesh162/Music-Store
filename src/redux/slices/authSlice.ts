import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type authState = {
  user: userState;
}

type userState = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  isAdmin: boolean;
  isVerified: boolean;
}


const initialState = {
  user:{
    firstName: "",
    lastName: "",
    email: "",
    token: "",
    isAdmin: false,
    isVerified: false
  }
} as authState


export const auth = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {

    saveUserInfo: (state,action: PayloadAction<{user: userState}>) => {
      let user = action.payload.user
      let savedUser:any={}
      for(const key in state.user){
        if(user[key as keyof typeof user]){
          savedUser[key as keyof typeof initialState] = user[key as keyof typeof user]
        }
      }
      state.user = savedUser
    },

    reset: (state) => {
      state.user = initialState.user
    }
  },
  extraReducers: {},
})


export const {
  reset,
  saveUserInfo,
} = auth.actions


export const userState = (state:authState) => state.user

export default auth.reducer