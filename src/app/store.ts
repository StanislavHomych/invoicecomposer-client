import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/company/companySlice';
import clientsReducer from '../features/clients/clientsSlice';
import invoicesReducer from '../features/invoices/invoicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    clients: clientsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
