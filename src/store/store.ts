import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import siteReducer from './reducers/site'
import userReducer from './reducers/user'
const reducers = combineReducers({
  auth: authReducer,
  site: siteReducer,
  user: userReducer
})

export const store = configureStore({
  reducer: reducers,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
