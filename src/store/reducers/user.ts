import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IAccount {
  displayName: string
  email: string
  phoneNumber: string
  photoURL: boolean
  uid: string
}

interface FireBaseState {
  infoAccount: IAccount | null
}

const initialState: FireBaseState = {
  infoAccount: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfoAccount: (state, action: PayloadAction<IAccount | null>) => {
      state.infoAccount = action?.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setInfoAccount } = userSlice.actions
export default userSlice.reducer
