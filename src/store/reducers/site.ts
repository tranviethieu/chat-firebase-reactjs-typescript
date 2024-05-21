import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IVariableEnv {
  publicApi: string
  publicApiDev: string
  publicApiSocket: string
  publicApiCore: string
  publicApiHome: string
  publicApiMeApp: string
  publicApiMedia: string
  publicImgae: string
}

export interface SiteState {
  loading: boolean
  routerPrev: string
  sort: any
  openLogout: boolean
  isMobile: boolean
  fontSize: 'sm' | 'md' | 'xl'
  bgColor: string
  variableEnv: IVariableEnv | null
  routerActive: string
}

const initialState: SiteState = {
  loading: true,
  routerPrev: '/',
  sort: {},
  openLogout: false,
  isMobile: false,
  fontSize: 'sm',
  bgColor: 'linear-gradient(135deg, rgb(71, 120, 209) 29%, rgb(247, 170, 248) 100%)',
  variableEnv: null,
  routerActive: '/'
}

export const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    updateRouterPrev: (state, action: PayloadAction<string>) => {
      state.routerPrev = action?.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload
    },
    updateSort: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state.sort = {
        ...state.sort,
        [action.payload.name]: action.payload.value
      }
    },
    toogleOpenLogout: (state) => {
      state.openLogout = !state.openLogout
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
    setFontSize: (state, action: PayloadAction<'sm' | 'md' | 'xl'>) => {
      state.fontSize = action.payload
    },
    setBgColor: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload
    },
    setVariableEnv: (state, action: PayloadAction<IVariableEnv | null>) => {
      state.variableEnv = action.payload
    },
    setRouterActive: (state, action: PayloadAction<string>) => {
      state.routerActive = action.payload
    }
  }
})

export const {
  updateRouterPrev,
  setLoading,
  updateSort,
  toogleOpenLogout,
  setIsMobile,
  setFontSize,
  setBgColor,
  setVariableEnv,
  setRouterActive
} = siteSlice.actions
// Action creators are generated for each case reducer function
export default siteSlice.reducer
