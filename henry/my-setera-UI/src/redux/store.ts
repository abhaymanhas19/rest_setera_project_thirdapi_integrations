import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import appStateSlice from "./features/appStateSlice";
import dataConnectionStateSlice from "./features/dataConnectionStateSlice";
import orderSaleStateSlice from "./features/orderSaleStateSlice";
import sipTunksStateSlice from "./features/sipTunksStateSlice";
import usersStateSlice from "./features/usersStateSlice";
import subscriptionStateSlice from "./features/subscriptionStateSlice";
import tasksStateSlice from "./features/tasksStateSlice";
import licenceStateSlice from "./features/licenceStateSlice";
import trafficStateSlice from "./features/trafficStateSlice";
import supportStateSlice from "./features/supportStateSlice";
import authStateSlice from "./features/authStateSlice";
import mobileUserStateSlice from "./features/mobileUserStateSlice";
import messageStateSlice from "./features/messagesStateSlice";
import organizationStateSlice from "./features/organizationStateSlice";

const allreducers = combineReducers(
  {
    authState: authStateSlice,
    appState: appStateSlice,
    usersState: usersStateSlice,
    dataConnection: dataConnectionStateSlice,
    sipTrunks: sipTunksStateSlice,
    orderSale: orderSaleStateSlice,
    subscription: subscriptionStateSlice,
    task: tasksStateSlice,
    licence: licenceStateSlice,
    traffic: trafficStateSlice,
    support: supportStateSlice,
    mobileUser: mobileUserStateSlice,
    messageUser: messageStateSlice,
    organisation: organizationStateSlice
  }
);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allreducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
