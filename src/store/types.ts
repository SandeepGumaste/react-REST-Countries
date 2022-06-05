import store from "./index";

export interface Theme {
  dark: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
