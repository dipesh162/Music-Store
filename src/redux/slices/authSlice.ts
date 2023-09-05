import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type userState = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  isAdmin: boolean;
  isVerified: boolean;
}


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  isAdmin: false,
  isVerified: false
} as userState


export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    saveUserInfo: (state,action: PayloadAction<{user: userState}>) => {
      let user = action.payload.user
      console.log(30,state)
      state.firstName = 'asd'
      // for(const key in state){
      //   if(user[key as keyof typeof user]){
      //     state[key as keyof typeof initialState] = user[key as keyof typeof user]

      //   }
      // }
    },

    reset: () => {
      console.log('reseting from redux')
      return initialState
    }
  },
  extraReducers: {},
})


export const {
  reset,
  saveUserInfo
} = auth.actions
export default auth.reducer